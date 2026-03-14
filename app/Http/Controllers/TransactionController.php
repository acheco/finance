<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Exception;
use Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('transactions/index', [
            'transactions' => $this->getTransactionsResource(),
            'categories' => Auth::user()->allAvailableCategories(),
            'openModal' => false,
        ]);
    }

    private function getTransactionsResource()
    {

        $sortOption = request('sort', 'latest');
        [$sortColumn, $sortDirection] = match ($sortOption) {
            'latest' => ['date', 'desc'],
            'oldest' => ['date', 'asc'],
            'a_z' => ['name', 'asc'],
            'z_a' => ['name', 'desc'],
            'highest' => ['amount', 'desc'],
            'lowest' => ['amount', 'asc'],
        };

        $search = request('search');
        $category = request('category', 'all');

        $transactions = Auth::user()
            ->transactions()
            ->with('category')
            ->when($search, fn ($query) => $query->where('name', 'ilike', '%'.$search.'%')
                ->orWhere('amount', 'like', '%'.$search.'%')
            )
            ->when(
                $category && $category !== 'all',
                fn ($query) => $query->where('category_id', $category)
            )
            ->orderBy($sortColumn, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(0);

        return TransactionResource::collection($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        Gate::authorize('create', Transaction::class);

        try {
            Auth::user()->transactions()->create($request->validated());

            return redirect()
                ->route('transactions.index')
                ->with('success', 'Transaction created successfully');

        } catch (Exception $e) {
            Log::error('Error creating transaction: '.$e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->validated(),
            ]);

            return redirect()
                ->route('transactions.index')
                ->with('error', 'An error occurred while creating the transaction. Please try again later.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Transaction::class);

        return Inertia::render('transactions/index', [
            'transactions' => $this->getTransactionsResource(),
            'categories' => Auth::user()->allAvailableCategories(),
            'mode' => 'create',
            'openModal' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        Gate::authorize('update', $transaction);

        return Inertia::render('transactions/index', [
            'transaction' => $transaction,
            'transactions' => $this->getTransactionsResource(),
            'categories' => Auth::user()->AllAvailableCategories(),
            'mode' => 'edit',
            'openModal' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        Gate::authorize('update', $transaction);

        try {
            $transaction->update($request->validated());

            return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully');
        } catch (Exception $e) {
            Log::error('Error updating transaction: '.$e->getMessage(), [
                'user_id' => Auth::id(),
                'request_data' => $request->validated(),
            ]);

            return redirect()
                ->route('transactions.index')
                ->with('error',
                    'An error occurred while updating the transaction. Please try again later.'
                );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        Gate::authorize('delete', $transaction);

        $transaction->delete();

        return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully');
    }

    private function getCategoriesResource()
    {
        //    Pendiente implementar filtro por categoria
        $categorySort = request('category,sort', 'all');

        $categories = Auth::user()->filteredCategory($categorySort);

        return CategoryResource::collection($categories)->resolve();
    }
}
