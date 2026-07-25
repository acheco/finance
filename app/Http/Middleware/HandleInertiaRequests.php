<?php

namespace App\Http\Middleware;

use App\Enums\AccountType;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'accountTypes' => collect(AccountType::cases())->map(fn (AccountType $type) => [
                'value' => $type->value,
                'label' => $type->label(),
            ])->all(),
            'categories' => fn () => $request->user()
                ? $this->resolveCategories($request->user())
                : [],
            'accounts' => fn () => $request->user()
                ?->account()
                ->select(['id', 'name', 'type', 'balance', 'color', 'icon'])
                ->get(),
        ];
    }

    /**
     * Resolve the cached categories available to the given user.
     *
     * Empty results are intentionally not cached, so that a temporarily
     * empty result (e.g., right after account creation, before any
     * categories exist) doesn't get locked in for the full cache TTL.
     *
     * @return array<int, array<string, mixed>>
     */
    private function resolveCategories(User $user): array
    {
        $cacheKey = "user.{$user->id}.categories";

        $categories = Cache::get($cacheKey);

        if ($categories !== null) {
            return $categories;
        }

        $categories = Category::forUser($user)
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color', 'icon', 'user_id'])
            ->toArray();

        if ($categories !== []) {
            Cache::put($cacheKey, $categories, now()->addHour());
        }

        return $categories;
    }
}
