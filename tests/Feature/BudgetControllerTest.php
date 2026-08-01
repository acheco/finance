<?php

use App\Models\Account;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Carbon\CarbonImmutable;
use Inertia\Testing\AssertableInertia as Assert;

test('the index page returns budgets shaped for the frontend', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    $account = Account::factory()->for($user)->create();
    $budget = Budget::factory()->for($user)->for($category)->create(['maximum' => 500.75]);

    $transaction = Transaction::factory()->for($user)->create([
        'account_id' => $account->id,
        'category_id' => $category->id,
        'transfer_id' => null,
        'type' => 'expense',
        'recipient' => 'Whole Foods',
        'amount' => 42.50,
        'date' => now(),
    ]);

    $this->actingAs($user)
        ->get(route('budgets.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('budgets')
            ->has('budgets', 1)
            ->where('budgets.0.id', $budget->id)
            ->where('budgets.0.user_id', $user->id)
            ->where('budgets.0.maximum', 500.75)
            ->where('budgets.0.spent', 42.5)
            ->where('budgets.0.category.id', $category->id)
            ->where('budgets.0.category.name', $category->name)
            ->where('budgets.0.category.color', $category->color)
            ->where('budgets.0.category.icon', $category->icon)
            ->has('budgets.0.category.transactions', 1)
            ->where('budgets.0.category.transactions.0.id', $transaction->id)
            ->where('budgets.0.category.transactions.0.recipient', 'Whole Foods')
            ->where('budgets.0.category.transactions.0.amount', 42.5)
            ->where('budgets.0.category.transactions.0.date', $transaction->date->format('Y-m-d'))
            ->where('budgets.0.category.transactions.0.type', 'expense'));
});

test('a user only sees their own budgets on the index page', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $otherCategory = Category::factory()->for($otherUser)->create();
    Budget::factory()->for($otherUser)->for($otherCategory)->create();

    $this->actingAs($user)
        ->get(route('budgets.index'))
        ->assertInertia(fn (Assert $page) => $page->has('budgets', 0));
});

test('the index page resolves the current month using the timezone cookie', function () {
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

    $this->actingAs($user)
        ->withUnencryptedCookie('timezone', 'America/New_York')
        ->get(route('budgets.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('budgets.0.id', $budget->id)
            ->where('budgets.0.spent', 40)
            ->has('budgets.0.category.transactions', 1));

    CarbonImmutable::setTestNow();
});
