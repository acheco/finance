<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use App\Models\Budget;
use App\Models\Transaction;
use DateTimeZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {

        $budgets = Budget::withRecentCategoryTransactions(Auth::user(), $this->resolveTimezone($request))
            ->get()
            ->map(fn(Budget $budget) => [
                'id' => $budget->id,
                'user_id' => $budget->user_id,
                'category' => [
                    'id' => $budget->category->id,
                    'name' => $budget->category->name,
                    'color' => $budget->category->color,
                    'icon' => $budget->category->icon,
                    'transactions' => $budget->category->transactions
                        ->map(fn(Transaction $transaction): array => [
                            'id' => $transaction->id,
                            'recipient' => $transaction->recipient,
                            'amount' => (float)$transaction->amount,
                            'date' => $transaction->date->format('Y-m-d'),
                            'type' => $transaction->type->value,
                        ])
                        ->values()
                        ->all(),
                ],
                'maximum' => (float)$budget->maximum,
                'spent' => (float)$budget->spent,
                'created_at' => $budget->created_at->toISOString(),
            ])
            ->values();

        return Inertia::render('budgets', [
            'budgets' => $budgets,
        ]);
    }

    /**
     * Resolve the IANA timezone reported by the client, falling back to the
     * application's default timezone when missing or invalid.
     */
    private function resolveTimezone(Request $request): string
    {
        $timezone = $request->cookie('timezone');

        return is_string($timezone) && in_array($timezone, DateTimeZone::listIdentifiers(), true)
            ? $timezone
            : config('app.timezone');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBudgetRequest $request)
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
        Gate::authorize('delete', $budget);

        $budget->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Budget deleted.')]);

        return redirect()->back();
    }
}
