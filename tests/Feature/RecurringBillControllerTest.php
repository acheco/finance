<?php

use App\Models\Account;
use App\Models\Category;
use App\Models\RecurringBill;
use App\Models\User;
use Carbon\CarbonImmutable;

test('a user can create a recurring bill', function () {
    $user = User::factory()->create();
    $account = Account::factory()->for($user)->create();
    $category = Category::factory()->for($user)->create();

    $this->actingAs($user)
        ->post(route('recurring-bills.store'), [
            'account_id' => $account->id,
            'category_id' => $category->id,
            'name' => 'Netflix',
            'amount' => 15.99,
            'frequency' => 'monthly',
            'due_day' => 15,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('recurring_bills', [
        'user_id' => $user->id,
        'name' => 'Netflix',
    ]);
});

test('updating only the due day recalculates the next due date', function () {
    CarbonImmutable::setTestNow(CarbonImmutable::parse('2026-08-02'));

    $user = User::factory()->create();
    $bill = RecurringBill::factory()->for($user)->create([
        'frequency' => 'monthly',
        'due_day' => 1,
        'next_due_date' => '2026-09-01',
    ]);

    $this->actingAs($user)
        ->put(route('recurring-bills.update', $bill), ['due_day' => 20])
        ->assertRedirect();

    expect($bill->fresh()->next_due_date->format('Y-m-d'))->toBe('2026-08-20');

    CarbonImmutable::setTestNow();
});

test('a user cannot update another users recurring bill', function () {
    $owner = User::factory()->create();
    $otherUser = User::factory()->create();
    $bill = RecurringBill::factory()->for($owner)->create();

    $this->actingAs($otherUser)
        ->put(route('recurring-bills.update', $bill), ['name' => 'Hacked'])
        ->assertForbidden();
});

test('a user can delete their recurring bill', function () {
    $user = User::factory()->create();
    $bill = RecurringBill::factory()->for($user)->create();

    $this->actingAs($user)
        ->delete(route('recurring-bills.destroy', $bill))
        ->assertRedirect();

    $this->assertDatabaseMissing('recurring_bills', ['id' => $bill->id]);
});
