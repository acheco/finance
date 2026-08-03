<?php

use App\Models\RecurringBill;
use App\Models\Transaction;
use App\Models\User;
use App\Services\RecurringBillDateCalculator;
use Carbon\CarbonImmutable;

it('clamps day 31 to last day of February', function () {
    $calc = new RecurringBillDateCalculator;
    $result = $calc->next(CarbonImmutable::parse('2026-01-31'), 'monthly', 31);
    expect($result->format('Y-m-d'))->toBe('2026-02-28');
});

test('generating bills creates a transaction and advances the next due date', function () {
    $user = User::factory()->create();
    $bill = RecurringBill::factory()->for($user)->create([
        'frequency' => 'monthly',
        'due_day' => 1,
        'next_due_date' => '2026-08-01',
    ]);

    $this->artisan('bills:generate')->assertExitCode(0);

    $this->assertDatabaseHas('transactions', [
        'recurring_bill_id' => $bill->id,
        'amount' => $bill->amount,
    ]);
    expect($bill->fresh()->next_due_date->format('Y-m-d'))->toBe('2026-09-01');
});

test('generating bills twice does not duplicate the transaction', function () {
    $user = User::factory()->create();
    $bill = RecurringBill::factory()->for($user)->create([
        'frequency' => 'monthly',
        'due_day' => 1,
        'next_due_date' => now()->subDay(),
    ]);

    $this->artisan('bills:generate')->assertExitCode(0);
    $this->artisan('bills:generate')->assertExitCode(0);

    expect(Transaction::where('recurring_bill_id', $bill->id)->count())->toBe(1);
});
