<?php

use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransferController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'login', 301)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('transactions', TransactionController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('transfers', TransferController::class)->only(['store', 'update', 'destroy']);

});

require __DIR__.'/settings.php';
