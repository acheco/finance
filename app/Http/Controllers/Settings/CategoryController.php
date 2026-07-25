<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $hiddenCategories = $user->hiddenCategories()->pluck('categories.id');

        $categories = Category::where(function ($query) use ($user) {
            $query->whereBelongsTo($user)
                ->orWhere('user_id', null);
        })
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'ilike', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(10)
            ->onEachSide(0)
            ->withQueryString()
            ->through(fn ($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'color' => $category->color,
                'icon' => $category->icon,
                'isHidden' => $hiddenCategories->contains($category->id),
                'user_id' => $category->user_id,
            ]);

        return Inertia::render('settings/categories', [
            'categories' => $categories,
            'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        Gate::authorize('create', Category::class);

        $request->user()->categories()->create([
            ...$request->validated(),
            'slug' => Str::slug($request->name),
        ]);

        Cache::forget("user.{$request->user()->id}.categories");

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category created.')]);

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        Gate::authorize('update', $category);

        $category->update([
            ...$request->validated(),
            'slug' => Str::slug($request->name),
        ]);

        Cache::forget("user.{$category->user_id}.categories");

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category updated.')]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        Gate::authorize('delete', $category);

        $category->delete();

        Cache::forget("user.{$category->user_id}.categories");

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category deleted.')]);

        return back();

    }
}
