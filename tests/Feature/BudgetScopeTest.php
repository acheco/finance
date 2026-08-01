<?php

use App\Models\Account;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Carbon\CarbonImmutable;

test('the scope only returns budgets belonging to the given user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $category = Category::factory()->for($user)->create();
    $otherCategory = Category::factory()->for($otherUser)->create();

    $budget = Budget::factory()->for($user)->for($category)->create();
    Budget::factory()->for($otherUser)->for($otherCategory)->create();

    $budgets = Budget::withRecentCategoryTransactions($user)->get();

    expect($budgets)->toHaveCount(1)
        ->and($budgets->first()->is($budget))->toBeTrue();
});

test('the scope eager loads the category with only the 3 most recent transactions from the current month', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    $account = Account::factory()->for($user)->create();
    $budget = Budget::factory()->for($user)->for($category)->create();

    $thisMonthTransactions = collect(range(1, 4))->map(fn (int $day) => Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'date' => now()->startOfMonth()->addDays($day),
    ]));

    Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'date' => now()->subMonthNoOverflow(),
    ]);

    $result = Budget::withRecentCategoryTransactions($user)->find($budget->id);

    expect($result->relationLoaded('category'))->toBeTrue()
        ->and($result->category->relationLoaded('transactions'))->toBeTrue()
        ->and($result->category->transactions)->toHaveCount(3)
        ->and($result->category->transactions->pluck('id')->all())
        ->toBe($thisMonthTransactions->sortByDesc('date')->take(3)->pluck('id')->all());
});

test('the scope calculates the total spent on the category for the current month', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    $account = Account::factory()->for($user)->create();
    $budget = Budget::factory()->for($user)->for($category)->create();

    Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 30,
        'date' => now(),
    ]);

    Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 20,
        'date' => now(),
    ]);

    // Income in the same category should not count as spent.
    Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'income',
        'amount' => 1000,
        'date' => now(),
    ]);

    // An expense from a previous month should not count.
    Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 500,
        'date' => now()->subMonthNoOverflow(),
    ]);

    $result = Budget::withRecentCategoryTransactions($user)->find($budget->id);

    expect((float) $result->spent)->toBe(50.0);
});

test('the scope does not leak another user\'s transactions on a shared category', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $sharedCategory = Category::factory()->create(['user_id' => null]);
    $budget = Budget::factory()->for($user)->for($sharedCategory)->create();

    $account = Account::factory()->for($user)->create();
    $otherAccount = Account::factory()->for($otherUser)->create();

    $ownTransaction = Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $sharedCategory->id,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 25,
        'date' => now(),
    ]);

    Transaction::factory()->for($otherUser)->create([
        'account_id' => $otherAccount->id,
        'category_id' => $sharedCategory->id,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 999,
        'date' => now(),
    ]);

    $result = Budget::withRecentCategoryTransactions($user)->find($budget->id);

    expect($result->category->transactions)->toHaveCount(1)
        ->and($result->category->transactions->first()->is($ownTransaction))->toBeTrue()
        ->and((float) $result->spent)->toBe(25.0);
});

test('the scope resolves the current month using the given timezone', function () {
    // Just after midnight UTC on Aug 1st, but still July 31st in New York.
    CarbonImmutable::setTestNow(CarbonImmutable::parse('2026-08-01 00:16:00', 'UTC'));

    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    $account = Account::factory()->for($user)->create();
    $budget = Budget::factory()->for($user)->for($category)->create();

    Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'amount' => 40,
        'date' => '2026-07-31',
    ]);

    $utcResult = Budget::withRecentCategoryTransactions($user)->find($budget->id);
    $localResult = Budget::withRecentCategoryTransactions($user, 'America/La_Paz')->find($budget->id);

    expect($utcResult->category->transactions)->toHaveCount(0)
        ->and((float) $utcResult->spent)->toBe(0.0)
        ->and($localResult->category->transactions)->toHaveCount(1)
        ->and((float) $localResult->spent)->toBe(40.0);

    CarbonImmutable::setTestNow();
});
