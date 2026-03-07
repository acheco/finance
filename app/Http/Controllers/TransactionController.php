<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
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
