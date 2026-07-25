<?php

use App\Models\Account;
use App\Models\Transaction;
use App\Models\Transfer;
use App\Models\User;

test('deleting an expense transaction refunds the account balance', function () {
    $user = User::factory()->create();
    $account = Account::factory()->for($user)->create(['balance' => 100]);
    $transaction = Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => null,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 40,
    ]);

    $this->actingAs($user)
        ->delete(route('transactions.destroy', $transaction))
        ->assertRedirect();

    expect((float) $account->fresh()->balance)->toBe(140.0)
        ->and(Transaction::find($transaction->id))->toBeNull();
});

test('deleting an income transaction removes it from the account balance', function () {
    $user = User::factory()->create();
    $account = Account::factory()->for($user)->create(['balance' => 100]);
    $transaction = Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => null,
        'transfer_id' => null,
        'type' => 'income',
        'amount' => 40,
    ]);

    $this->actingAs($user)
        ->delete(route('transactions.destroy', $transaction))
        ->assertRedirect();

    expect((float) $account->fresh()->balance)->toBe(60.0);
});

test('deleting one leg of a transfer through the transaction route reverses both balances and removes the whole transfer', function () {
    $user = User::factory()->create();
    $fromAccount = Account::factory()->for($user)->create(['balance' => 100]);
    $toAccount = Account::factory()->for($user)->create(['balance' => 50]);

    $transfer = $user->transfers()->create([
        'from_account_id' => $fromAccount->id,
        'to_account_id' => $toAccount->id,
        'amount' => 30,
        'date' => now(),
        'description' => 'moving money',
    ]);

    [$outTransaction, $inTransaction] = $transfer->transaction()->createMany([
        [
            'user_id' => $user->id,
            'account_id' => $fromAccount->id,
            'amount' => 30,
            'type' => 'transfer_out',
            'date' => now(),
        ],
        [
            'user_id' => $user->id,
            'account_id' => $toAccount->id,
            'amount' => 30,
            'type' => 'transfer_in',
            'date' => now(),
        ],
    ]);

    $fromAccount->decrement('balance', 30);
    $toAccount->increment('balance', 30);

    $this->actingAs($user)
        ->delete(route('transactions.destroy', $outTransaction))
        ->assertRedirect();

    expect((float) $fromAccount->fresh()->balance)->toBe(100.0)
        ->and((float) $toAccount->fresh()->balance)->toBe(50.0)
        ->and(Transfer::find($transfer->id))->toBeNull()
        ->and(Transaction::find($outTransaction->id))->toBeNull()
        ->and(Transaction::find($inTransaction->id))->toBeNull();
});

test('deleting a transfer reverses both account balances and deletes its transactions', function () {
    $user = User::factory()->create();
    $fromAccount = Account::factory()->for($user)->create(['balance' => 100]);
    $toAccount = Account::factory()->for($user)->create(['balance' => 50]);

    $transfer = $user->transfers()->create([
        'from_account_id' => $fromAccount->id,
        'to_account_id' => $toAccount->id,
        'amount' => 30,
        'date' => now(),
        'description' => 'moving money',
    ]);

    $transfer->transaction()->createMany([
        [
            'user_id' => $user->id,
            'account_id' => $fromAccount->id,
            'amount' => 30,
            'type' => 'transfer_out',
            'date' => now(),
        ],
        [
            'user_id' => $user->id,
            'account_id' => $toAccount->id,
            'amount' => 30,
            'type' => 'transfer_in',
            'date' => now(),
        ],
    ]);

    $fromAccount->decrement('balance', 30);
    $toAccount->increment('balance', 30);

    $this->actingAs($user)
        ->delete(route('transfers.destroy', $transfer))
        ->assertRedirect();

    expect((float) $fromAccount->fresh()->balance)->toBe(100.0)
        ->and((float) $toAccount->fresh()->balance)->toBe(50.0)
        ->and(Transfer::find($transfer->id))->toBeNull()
        ->and(Transaction::where('transfer_id', $transfer->id)->count())->toBe(0);
});

test('a user cannot delete another users transaction', function () {
    $owner = User::factory()->create();
    $intruder = User::factory()->create();
    $account = Account::factory()->for($owner)->create(['balance' => 100]);
    $transaction = Transaction::factory()->for($owner)->create([
        'account_id' => $account->id,
        'category_id' => null,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 40,
    ]);

    $this->actingAs($intruder)
        ->delete(route('transactions.destroy', $transaction))
        ->assertForbidden();

    expect((float) $account->fresh()->balance)->toBe(100.0);
});
