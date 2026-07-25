<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Inertia\Testing\AssertableInertia as Assert;

test('empty categories are shared but not cached', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page->where('categories', []));

    expect(Cache::has("user.{$user->id}.categories"))->toBeFalse();
});

test('categories are shared and cached once they exist', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'user_id' => null,
        'slug' => 'general',
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('categories', 1)
            ->where('categories.0.id', $category->id));

    expect(Cache::get("user.{$user->id}.categories"))
        ->toHaveCount(1)
        ->and(Cache::get("user.{$user->id}.categories")[0]['id'])->toBe($category->id);
});
