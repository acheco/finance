<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class HiddenCategoryController extends Controller
{
    public function store(Request $request, Category $category): RedirectResponse
    {
        Gate::authorize('hide', $category);

        $request->user()->hiddenCategories()->syncWithoutDetaching($category);
        Cache::forget("user.{$request->user()->id}.categories");

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category hidden.')]);

        return back();
    }

    public function destroy(Request $request, Category $category): RedirectResponse
    {
        $request->user()->hiddenCategories()->detach($category);
        Cache::forget("user.{$request->user()->id}.categories");

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category unhidden.')]);

        return back();
    }
}
