<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use App\Models\Budget;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $budgets = Budget::withRecentCategoryTransactions(Auth::user())
            ->get()
            ->map(fn (Budget $budget) => [
                'id' => $budget->id,
                'user_id' => $budget->user_id,
                'category' => [
                    'id' => $budget->category->id,
                    'name' => $budget->category->name,
                    'color' => $budget->category->color,
                    'icon' => $budget->category->icon,
                    'transactions' => $budget->category->transactions
                        ->map(fn (Transaction $transaction): array => [
                            'id' => $transaction->id,
                            'recipient' => $transaction->recipient,
                            'amount' => (float) $transaction->amount,
                            'date' => $transaction->date->format('Y-m-d'),
                            'type' => $transaction->type->value,
                        ])
                        ->values()
                        ->all(),
                ],
                'maximum' => (float) $budget->maximum,
                'spent' => (float) $budget->spent,
                'created_at' => $budget->created_at->toISOString(),
            ])
            ->values();

        return Inertia::render('budgets', [
            'budgets' => $budgets,
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
    public function store(StoreBudgetRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Budget $budget)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Budget $budget)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBudgetRequest $request, Budget $budget)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget)
    {
        //
    }
}
