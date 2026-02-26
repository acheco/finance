<?php

use App\Models\Pot;
use App\Models\User;

test('authenticated user can view pots create page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('pots.create'));

    $response->assertSuccessful();
});

test('authenticated user can view pots edit page', function () {
    $user = User::factory()->create();
    $pot = Pot::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('pots.edit', $pot));

    $response->assertSuccessful();
});
