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
      'openModal' => false,
    ]);
  }

  private function getTransactionsResource()
  {
    $transactions = Auth::user()
      ->transactions()
      ->with('category')
      ->orderBy('date', 'desc')
      ->paginate(10)
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
      Log::error('Error creating transaction: ' . $e->getMessage(), [
        'user_id' => Auth::id(),
        'request_data' => $request->validated()
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
      'categories' => $this->getCategoriesResource(),
      'mode' => 'create',
      'openModal' => true,
    ]);
  }

  private function getCategoriesResource()
  {
    $categories = Auth::user()->allAvailableCategories();
    return CategoryResource::collection($categories)->resolve();
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
      'categories' => $this->getCategoriesResource(),
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
      Auth::user()->transactions()->update($request->validated());

      return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully');
    } catch (Exception $e) {
      Log::error('Error updating transaction: '.$e->getMessage(), [
        'user_id' => Auth::id(),
        'request_data' => $request->validated()
      ]);
      return redirect()->route('transactions.index')->with('error',
        'An error occurred while updating the transaction. Please try again later.');
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
}
