<?php

use App\Models\Budget;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\QueryException;

test('a budget belongs to a user and a category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    $budget = Budget::factory()->for($user)->for($category)->create();

    expect($budget->user)->toBeInstanceOf(User::class)
        ->and($budget->user->is($user))->toBeTrue()
        ->and($budget->category)->toBeInstanceOf(Category::class)
        ->and($budget->category->is($category))->toBeTrue();
});

test('a user has many budgets', function () {
    $user = User::factory()->create();
    $categories = Category::factory()->for($user)->count(2)->create();

    foreach ($categories as $category) {
        Budget::factory()->for($user)->for($category)->create();
    }

    expect($user->budgets()->count())->toBe(2);
});

test('a category has many budgets', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    Budget::factory()->for($user)->for($category)->create();

    expect($category->budgets()->count())->toBe(1);
});

test('a user cannot have two budgets for the same category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    Budget::factory()->for($user)->for($category)->create();

    expect(fn () => Budget::factory()->for($user)->for($category)->create())
        ->toThrow(QueryException::class);
});

test('deleting a category deletes its budgets', function () {
    $user = User::factory()->create();
    $category = Category::factory()->for($user)->create();
    $budget = Budget::factory()->for($user)->for($category)->create();

    $category->delete();

    expect(Budget::find($budget->id))->toBeNull();
});
