<?php

use App\Models\Account;
use App\Models\Transaction;
use App\Models\Transfer;
use App\Models\User;

test('storing a transfer moves the balance and creates both transaction legs', function () {
    $user = User::factory()->create();
    $fromAccount = Account::factory()->for($user)->create(['balance' => 100]);
    $toAccount = Account::factory()->for($user)->create(['balance' => 20]);

    $this->actingAs($user)
        ->post(route('transfers.store'), [
            'from_account_id' => $fromAccount->id,
            'to_account_id' => $toAccount->id,
            'amount' => 30,
            'date' => now()->toDateString(),
            'description' => 'rent',
        ])
        ->assertRedirect();

    expect((float) $fromAccount->fresh()->balance)->toBe(70.0)
        ->and((float) $toAccount->fresh()->balance)->toBe(50.0);

    $transfer = Transfer::sole();
    expect(Transaction::where('transfer_id', $transfer->id)->count())->toBe(2);
});

test('storing a transfer fails validation when the amount exceeds the source balance', function () {
    $user = User::factory()->create();
    $fromAccount = Account::factory()->for($user)->create(['balance' => 10]);
    $toAccount = Account::factory()->for($user)->create(['balance' => 20]);

    $this->actingAs($user)
        ->post(route('transfers.store'), [
            'from_account_id' => $fromAccount->id,
            'to_account_id' => $toAccount->id,
            'amount' => 30,
            'date' => now()->toDateString(),
            'description' => 'rent',
        ])
        ->assertSessionHasErrors('amount');

    expect((float) $fromAccount->fresh()->balance)->toBe(10.0)
        ->and((float) $toAccount->fresh()->balance)->toBe(20.0)
        ->and(Transfer::count())->toBe(0);
});

test('updating a transfer with the same accounts and amount leaves balances unchanged', function () {
    $user = User::factory()->create();
    $accountA = Account::factory()->for($user)->create(['balance' => 100]);
    $accountB = Account::factory()->for($user)->create(['balance' => 50]);

    $transfer = $user->transfers()->create([
        'from_account_id' => $accountA->id,
        'to_account_id' => $accountB->id,
        'amount' => 20,
        'date' => now(),
        'description' => 'initial',
    ]);
    $transfer->transaction()->createMany([
        ['user_id' => $user->id, 'account_id' => $accountA->id, 'amount' => 20, 'type' => 'transfer_out', 'date' => now()],
        ['user_id' => $user->id, 'account_id' => $accountB->id, 'amount' => 20, 'type' => 'transfer_in', 'date' => now()],
    ]);
    $accountA->decrement('balance', 20);
    $accountB->increment('balance', 20);

    // Editing with identical accounts/amount must reverse the old movement
    // then reapply the same one, netting out to the balances above.
    $this->actingAs($user)
        ->put(route('transfers.update', $transfer), [
            'from_account_id' => $accountA->id,
            'to_account_id' => $accountB->id,
            'amount' => 20,
            'date' => now()->toDateString(),
            'description' => 'updated description only',
        ])
        ->assertRedirect();

    expect((float) $accountA->fresh()->balance)->toBe(80.0)
        ->and((float) $accountB->fresh()->balance)->toBe(70.0);
});

test('updating a transfer to a different amount adjusts balances by the delta', function () {
    $user = User::factory()->create();
    $accountA = Account::factory()->for($user)->create(['balance' => 100]);
    $accountB = Account::factory()->for($user)->create(['balance' => 50]);

    $transfer = $user->transfers()->create([
        'from_account_id' => $accountA->id,
        'to_account_id' => $accountB->id,
        'amount' => 20,
        'date' => now(),
        'description' => 'initial',
    ]);
    $transfer->transaction()->createMany([
        ['user_id' => $user->id, 'account_id' => $accountA->id, 'amount' => 20, 'type' => 'transfer_out', 'date' => now()],
        ['user_id' => $user->id, 'account_id' => $accountB->id, 'amount' => 20, 'type' => 'transfer_in', 'date' => now()],
    ]);
    $accountA->decrement('balance', 20);
    $accountB->increment('balance', 20);
    // accountA = 80, accountB = 70

    $this->actingAs($user)
        ->put(route('transfers.update', $transfer), [
            'from_account_id' => $accountA->id,
            'to_account_id' => $accountB->id,
            'amount' => 50,
            'date' => now()->toDateString(),
            'description' => 'bumped amount',
        ])
        ->assertRedirect();

    expect((float) $accountA->fresh()->balance)->toBe(50.0)
        ->and((float) $accountB->fresh()->balance)->toBe(100.0)
        ->and(Transaction::where('transfer_id', $transfer->id)->count())->toBe(2);
});

test('updating a transfer fails validation when the new amount exceeds the source balance', function () {
    $user = User::factory()->create();
    $accountA = Account::factory()->for($user)->create(['balance' => 100]);
    $accountB = Account::factory()->for($user)->create(['balance' => 50]);

    $transfer = $user->transfers()->create([
        'from_account_id' => $accountA->id,
        'to_account_id' => $accountB->id,
        'amount' => 20,
        'date' => now(),
        'description' => 'initial',
    ]);
    $transfer->transaction()->createMany([
        ['user_id' => $user->id, 'account_id' => $accountA->id, 'amount' => 20, 'type' => 'transfer_out', 'date' => now()],
        ['user_id' => $user->id, 'account_id' => $accountB->id, 'amount' => 20, 'type' => 'transfer_in', 'date' => now()],
    ]);
    $accountA->decrement('balance', 20);
    $accountB->increment('balance', 20);
    // accountA = 80, accountB = 70

    $this->actingAs($user)
        ->put(route('transfers.update', $transfer), [
            'from_account_id' => $accountA->id,
            'to_account_id' => $accountB->id,
            'amount' => 999,
            'date' => now()->toDateString(),
            'description' => 'too much',
        ])
        ->assertSessionHasErrors('amount');

    expect((float) $accountA->fresh()->balance)->toBe(80.0)
        ->and((float) $accountB->fresh()->balance)->toBe(70.0)
        ->and($transfer->fresh()->amount)->toEqual(20);
});
