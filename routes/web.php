<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
  return Inertia::render('Welcome');
})->name('home');
