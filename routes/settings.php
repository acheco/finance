<?php

use App\Http\Controllers\Settings\AccountController;
use App\Http\Controllers\Settings\CategoryController;
use App\Http\Controllers\Settings\HiddenCategoryController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::resource('settings/account', AccountController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('settings/category', CategoryController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::post('settings/category/{category}/hide', [HiddenCategoryController::class, 'store'])->name('category.hide');
    Route::delete('settings/category/{category}/hide', [HiddenCategoryController::class, 'destroy'])->name('category.unhide');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
