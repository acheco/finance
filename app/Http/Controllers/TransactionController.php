<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Transaction;
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
                    ? ($transaction->type === TransactionType::TransferOut
                        ? $transaction->transfer->toAccount->only(['id'])
                        : $transaction->transfer->fromAccount->only(['id']))
                    : null,
                'type' => $transaction->type->label(),
                'date' => $transaction->date->format('d M Y'),
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
