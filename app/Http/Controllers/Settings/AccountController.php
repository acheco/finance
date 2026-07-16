<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Models\Account;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = auth()->user();

        $accounts = Account::whereBelongsTo($user)
            ->where('is_active', true)
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'ilike', "%{$search}%")
                    ->orWhere('type', 'ilike', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(10)
            ->onEachSide(0)
            ->withQueryString();

        return Inertia::render('settings/account/index', [
            'accounts' => $accounts,
            'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request): RedirectResponse
    {

        Gate::authorize('create', Account::class);

        $user = auth()->user();

        $user->account()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Account created.')]);

        return to_route('account.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, Account $account): RedirectResponse
    {
        Gate::authorize('update', $account);

        $account->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Account updated.')]);

        return to_route('account.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account): RedirectResponse
    {
        Gate::authorize('delete', $account);

        $account->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Account deleted.')]);

        return to_route('account.index');
    }
}
