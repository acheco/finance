<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecurringBillRequest;
use App\Http\Requests\UpdateRecurringBillRequest;
use App\Models\RecurringBill;
use App\Services\RecurringBillDateCalculator;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Number;
use Illuminate\Support\Str;
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

        $sortOptions = [
            'latest' => ['next_due_date', 'desc'],
            'oldest' => ['next_due_date', 'asc'],
            'a_to_z' => ['name', 'asc'],
            'z_to_a' => ['name', 'desc'],
            'highest' => ['amount', 'desc'],
            'lowest' => ['amount', 'asc'],
        ];

        [$sortColumn, $sortDirection] = $sortOptions[request('sort')] ?? $sortOptions['latest'];

        $bills = RecurringBill::whereBelongsTo(Auth::user())
            ->with(['category'])
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'ilike', "%{$search}%");
            })
            ->orderBy($sortColumn, $sortDirection)
            ->get()
            ->map(fn (RecurringBill $bill) => [
                'id' => $bill->id,
                'account_id' => $bill->account_id,
                'name' => $bill->name,
                'amount' => $bill->amount,
                'frequency' => Str::ucfirst($bill->frequency),
                'frequency_raw' => $bill->frequency,
                'due_day' => $bill->due_day !== null ? Number::ordinal($bill->due_day) : null,
                'due_day_raw' => $bill->due_day,
                'status' => $bill->status,
                'next_due_date' => $bill->next_due_date->format('Y-m-d'),
                'category' => $bill->category?->only(['id', 'color', 'icon']),
            ])
            ->values()
            ->all();

        return Inertia::render('recurring-bills', [
            'bills' => $bills,
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRecurringBillRequest $request): RedirectResponse
    {
        Gate::authorize('create', RecurringBill::class);

        $data = $request->validated();

        $nextDueDate = $this->dateCalculator->first(CarbonImmutable::now(), $data['frequency'], $data['due_day'] ?? null);

        RecurringBill::create([
            ...$data,
            'user_id' => Auth::id(),
            'next_due_date' => $nextDueDate,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Recurring bill created.')]);

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
                CarbonImmutable::now(),
                $data['frequency'] ?? $recurringBill->frequency,
                $data['due_day'] ?? $recurringBill->due_day
            );
        }

        $recurringBill->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Recurring bill updated.')]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RecurringBill $recurringBill): RedirectResponse
    {
        Gate::authorize('delete', $recurringBill);

        $recurringBill->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Recurring bill deleted.')]);

        return redirect()->back();
    }
}
