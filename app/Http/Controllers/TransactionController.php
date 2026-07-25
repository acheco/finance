<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

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
                        ->orWhere('date', 'ilike', "%{$search}%")
                        ->orWhere('amount', 'ilike', "%{$search}%")
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
                        'id' => $transaction->transfer->id,
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
     *
     * @throws Throwable
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        Gate::authorize('create', Transaction::class);

        DB::transaction(function () use ($request) {
            /** @var Account $account */
            $account = Account::whereBelongsTo($request->user())
                ->lockForUpdate()
                ->findOrFail($request->account_id);

            $transaction = $request->user()->transactions()->create($request->validated());

            $this->applyBalanceChange($account, $transaction->type, $transaction->amount);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transaction created.')]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws Throwable
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction): RedirectResponse
    {
        Gate::authorize('update', $transaction);

        DB::transaction(function () use ($request, $transaction) {
            /** @var Account $oldAccount */
            $oldAccount = Account::lockForUpdate()->findOrFail($transaction->account_id);
            $this->reverseBalanceChange($oldAccount, $transaction->type, $transaction->amount);

            if ($oldAccount->id === (int) $request->account_id) {
                $newAccount = $oldAccount;
            } else {
                /** @var Account $newAccount */
                $newAccount = Account::whereBelongsTo($request->user())
                    ->lockForUpdate()
                    ->findOrFail($request->account_id);
            }

            $transaction->update($request->validated());

            $this->applyBalanceChange($newAccount, $transaction->type, $transaction->amount);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transaction updated.')]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws Throwable
     */
    public function destroy(Transaction $transaction): RedirectResponse
    {
        Gate::authorize('delete', $transaction);

        if ($transaction->transfer_id !== null) {
            Gate::authorize('delete', $transaction->transfer);

            $transaction->transfer->reverseAndDelete();
        } else {
            DB::transaction(function () use ($transaction) {
                /** @var Account $account */
                $account = Account::lockForUpdate()->findOrFail($transaction->account_id);
                $this->reverseBalanceChange($account, $transaction->type, $transaction->amount);

                $transaction->delete();
            });
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transaction deleted.')]);

        return redirect()->back();
    }

    /**
     * Apply a transaction's effect on its account balance.
     */
    private function applyBalanceChange(Account $account, TransactionType $type, string|float $amount): void
    {
        match ($type) {
            TransactionType::Income => $account->increment('balance', (float) $amount),
            TransactionType::Expense => $account->decrement('balance', (float) $amount),
            TransactionType::TransferIn, TransactionType::TransferOut => null,
        };
    }

    /**
     * Reverse a transaction's effect on its account balance.
     */
    private function reverseBalanceChange(Account $account, TransactionType $type, string|float $amount): void
    {
        match ($type) {
            TransactionType::Income => $account->decrement('balance', (float) $amount),
            TransactionType::Expense => $account->increment('balance', (float) $amount),
            TransactionType::TransferIn, TransactionType::TransferOut => null,
        };
    }
}
