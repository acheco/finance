<?php

use Illuminate\Support\Facades\Route;

Route::inertia('login', 'Auth/Login')->name('login');
Route::inertia('register', 'Auth/Register')->name('register');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});
