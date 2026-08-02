<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecurringBillRequest;
use App\Http\Requests\UpdateRecurringBillRequest;
use App\Models\RecurringBill;
use App\Services\RecurringBillDateCalculator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RecurringBillController extends Controller
{
    public function __construct(
        private readonly RecurringBillDateCalculator $dateCalculator,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $bills = RecurringBill::query()
            ->where('user_id', auth()->id())
            ->with(['account', 'category'])
            ->orderBy('next_due_date')
            ->get();

        return Inertia::render('recurring-bills', [
            'bills' => $bills,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRecurringBillRequest $request): RedirectResponse
    {
        Gate::authorize('create', RecurringBill::class);

        $data = $request->validated();

        $nextDueDate = $this->dateCalculator->first(now(), $data['frequency'], $data['due_day'] ?? null);

        RecurringBill::create([
            ...$data,
            'user_id' => Auth::id(),
            'next_due_date' => $nextDueDate,
        ]);

        Inertia::flash('success', ['type' => 'success', 'message' => __('Recurring bill created.')]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRecurringBillRequest $request, RecurringBill $recurringBill): RedirectResponse
    {
        Gate::authorize('update', $recurringBill);

        $data = $request->validated();

        if (isset($data['frequency']) || array_key_exists('due_day', $data)) {
            $data['next_due_date'] = $this->dateCalculator->first(
                now(),
                $data['frequency'] ?? $recurringBill->frequency,
                $data['due_day'] ?? $recurringBill->due_day
            );
        }

        $recurringBill->update($data);

        Inertia::flash('success', ['type' => 'success', 'message' => __('Recurring bill updated.')]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RecurringBill $recurringBill): RedirectResponse
    {
        Gate::authorize('delete', $recurringBill);

        $recurringBill->delete();

        Inertia::flash('success', ['type' => 'success', 'message' => __('Recurring bill deleted.')]);

        return redirect()->back();
    }
}
