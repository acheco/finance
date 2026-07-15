<?php

use App\Models\Account;
use App\Models\User;

test('user can delete an account from the accounts table dropdown', function () {
    $user = User::factory()->create();
    $account = Account::factory()->for($user)->create(['name' => 'Chase Checking']);

    $this->actingAs($user);

    $page = visit(route('account.index'));

    $page->assertSee('Chase Checking')
        ->click('[aria-haspopup="menu"]:not([data-sidebar])')
        ->assertSee('Delete Account')
        ->click('Delete Account')
        ->wait(1)
        ->assertNoJavaScriptErrors()
        ->assertDontSee('Chase Checking');

    $this->assertModelMissing($account);
});
