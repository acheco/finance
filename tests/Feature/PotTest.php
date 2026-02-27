<?php

use App\Models\Pot;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;

// Authorization

test('guests cannot access pots create page', function () {
    $response = $this->get(route('pots.create'));

    $response->assertRedirect(route('login'));
});

test('guests cannot access pots edit page', function () {
    $pot = Pot::factory()->create();

    $response = $this->get(route('pots.edit', $pot));

    $response->assertRedirect(route('login'));
});

test('authenticated user can view pots create page', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->get(route('pots.create'));

    $response->assertSuccessful();
});

test('authenticated user can view pots edit page', function () {
    $user = User::factory()->create();
    $pot = Pot::factory()->create(['user_id' => $user->id]);

    $response = actingAs($user)->get(route('pots.edit', $pot));

    $response->assertSuccessful();
});

test('user can only access their own pots', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $pot = Pot::factory()->create(['user_id' => $user2->id]);

    $response = actingAs($user1)->get(route('pots.edit', $pot));

    $response->assertForbidden();
});

// Creation

test('a pot can be created with valid data', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->post(route('pots.store'), [
        'name' => 'My Pot',
        'target_amount' => 1000,
        'total_amount' => 0,
        'theme' => '#FF0000',
    ]);

    $response->assertRedirect(route('pots.index'));
    assertDatabaseHas('pots', [
        'user_id' => $user->id,
        'name' => 'My Pot',
        'target_amount' => 1000,
        'total_amount' => 0,
        'theme' => '#FF0000',
    ]);
});

test('a pot cannot be created with invalid data', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->post(route('pots.store'), [
        'name' => null,
        'target_amount' => 'invalid',
    ]);

    $response->assertSessionHasErrors(['name', 'target_amount']);
});

// Update

test('a pot can be updated with valid data', function () {
    $user = User::factory()->create();
    $pot = Pot::factory()->create(['user_id' => $user->id]);

    $response = actingAs($user)->put(route('pots.update', $pot), [
        'name' => 'Updated Pot Name',
        'target_amount' => 2000,
        'theme' => '#FF0000',
    ]);

    $response->assertRedirect(route('pots.index'));
    assertDatabaseHas('pots', [
        'id' => $pot->id,
        'name' => 'Updated Pot Name',
        'target_amount' => 2000,
    ]);
});

test('a pot cannot be updated with invalid data', function () {
    $user = User::factory()->create();
    $pot = Pot::factory()->create(['user_id' => $user->id]);

    $response = actingAs($user)->put(route('pots.update', $pot), [
        'name' => null,
        'target_amount' => 'invalid',
    ]);

    $response->assertSessionHasErrors(['name', 'target_amount']);
});

// Deletion

test('a pot can be deleted', function () {
    $user = User::factory()->create();
    $pot = Pot::factory()->create(['user_id' => $user->id]);

    $response = actingAs($user)->delete(route('pots.destroy', $pot));

    $response->assertRedirect(route('pots.index'));
    assertDatabaseMissing('pots', [
        'id' => $pot->id,
    ]);
});
