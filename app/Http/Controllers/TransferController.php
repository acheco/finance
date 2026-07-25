<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Requests\StoreTransferRequest;
use App\Http\Requests\UpdateTransferRequest;
use App\Models\Account;
use App\Models\Transfer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Throwable;

class TransferController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @throws Throwable
     */
    public function store(StoreTransferRequest $request): RedirectResponse
    {
        Gate::authorize('create', Transfer::class);

        $user = auth()->user();

        DB::transaction(function () use ($request, $user) {
            $fromAccount = Account::whereBelongsTo($request->user())
                ->lockForUpdate()
                ->findOrFail($request->from_account_id);

            $toAccount = Account::whereBelongsTo($request->user())
                ->lockForUpdate()
                ->findOrFail($request->to_account_id);

            if ($request->amount > $fromAccount->balance) {
                throw ValidationException::withMessages([
                    'amount' => __('The amount exceeds the balance of the source account.'),
                ]);
            }

            $transfer = $request->user()->transfers()->create([
                'from_account_id' => $fromAccount->id,
                'to_account_id' => $toAccount->id,
                'amount' => $request->amount,
                'date' => $request->date,
                'description' => $request->description,
            ]);

            $transfer->transaction()->createMany([
                [
                    'user_id' => $user->id,
                    'account_id' => $fromAccount->id,
                    'amount' => $request->amount,
                    'type' => TransactionType::TransferOut->value,
                    'date' => $request->date,
                    'description' => $request->description,
                ],
                [
                    'user_id' => $user->id,
                    'account_id' => $toAccount->id,
                    'amount' => $request->amount,
                    'type' => TransactionType::TransferIn->value,
                    'date' => $request->date,
                    'description' => $request->description,
                ],
            ]);

            $fromAccount->decrement('balance', $request->amount);
            $toAccount->increment('balance', $request->amount);

        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transfer created.')]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws Throwable
     */
    public function update(UpdateTransferRequest $request, Transfer $transfer): RedirectResponse
    {
        Gate::authorize('update', $transfer);

        $user = auth()->user();

        DB::transaction(function () use ($request, $transfer, $user) {
            $oldFromAccount = Account::lockForUpdate()->findOrFail($transfer->from_account_id);
            $oldToAccount = Account::lockForUpdate()->findOrFail($transfer->to_account_id);
            $oldFromAccount->decrement('balance', $transfer->amount);
            $oldToAccount->increment('balance', $transfer->amount);

            $newFromAccount = Account::whereBelongsTo($request->user())
                ->lockForUpdate()
                ->findOrFail($request->from_account_id);
            $newToAccount = Account::whereBelongsTo($request->user())
                ->lockForUpdate()
                ->findOrFail($request->to_account_id);

            if ($request->amount > $newFromAccount->balance) {
                throw ValidationException::withMessages([
                    'amount' => __('The amount exceeds the balance of the source account.'),
                ]);
            }

            $transfer->update([
                'from_account_id' => $newFromAccount->id,
                'to_account_id' => $newToAccount->id,
                'amount' => $request->amount,
                'date' => $request->date,
                'description' => $request->description,
            ]);

            $transfer->transaction()->delete();
            $transfer->transaction()->createMany([
                [
                    'user_id' => $user->id,
                    'account_id' => $newFromAccount->id,
                    'amount' => $request->amount,
                    'type' => TransactionType::TransferOut->value,
                    'date' => $request->date,
                    'description' => $request->description,
                ],
                [
                    'user_id' => $user->id,
                    'account_id' => $newToAccount->id,
                    'amount' => $request->amount,
                    'type' => TransactionType::TransferIn->value,
                    'date' => $request->date,
                    'description' => $request->description,
                ],
            ]);

            $newFromAccount->decrement('balance', $request->amount);
            $newToAccount->increment('balance', $request->amount);

        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transfer updated.')]);

        return redirect()->back();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws Throwable
     */
    public function destroy(Transfer $transfer): RedirectResponse
    {
        Gate::authorize('delete', $transfer);

        $transfer->reverseAndDelete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Transfer deleted.')]);

        return redirect()->back();
    }
}
