<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = auth()->user();

        $sortOptions = [
            'latest' => ['date', 'desc'],
            'oldest' => ['date', 'asc'],
            'a_to_z' => ['recipient', 'asc'],
            'z_to_a' => ['recipient', 'desc'],
            'highest' => ['amount', 'desc'],
            'lowest' => ['amount', 'asc'],
        ];

        [$sortColumn, $sortDirection] = $sortOptions[request('sort')] ?? $sortOptions['latest'];

        $transactions = Transaction::whereBelongsTo($user)
            ->with(['account', 'category', 'transfer.fromAccount', 'transfer.toAccount'])
            ->when(request('search'), function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('recipient', 'ilike', "%{$search}%")
                        ->orWhere('description', 'ilike', "%{$search}%")
                        ->orWhereHas('account', fn ($q) => $q->where('name', 'ilike', "%{$search}%"))
                        ->orWhereHas('category', fn ($q) => $q->where('name', 'ilike', "%{$search}%"));
                });
            })
            ->when(request('category'), function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->orderBy($sortColumn, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($transaction) => [
                ...$transaction->toArray(),
                'account' => $transaction->account->only(['id', 'name']),
                'category' => $transaction->category?->only(['id', 'name', 'color', 'icon']),
                'transfer' => $transaction->transfer
                    ? [
                        'from_account' => $transaction->transfer->fromAccount->only(['id', 'name']),
                        'to_account' => $transaction->transfer->toAccount->only(['id', 'name']),
                    ]
                    : null,
                'type' => $transaction->type->label(),
                'date' => $transaction->date->format('d M Y'),
                'raw_date' => $transaction->date->format('Y-m-d'),
            ]);

        return Inertia::render('Transaction', [
            'transactions' => $transactions,
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort', 'latest'),
                'category' => request('category'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        Gate::authorize('create', Transaction::class);

        $request->user()->transactions()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transaction created.')]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction): RedirectResponse
    {
        Gate::authorize('update', $transaction);

        $transaction->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transaction updated.')]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction): RedirectResponse
    {
        Gate::authorize('delete', $transaction);

        $transaction->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transaction deleted.')]);

        return redirect()->back();
    }
}
