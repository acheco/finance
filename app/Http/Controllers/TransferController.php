<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Http\Requests\StoreTransferRequest;
use App\Http\Requests\UpdateTransferRequest;
use App\Models\Account;
use App\Models\Transfer;
use App\Models\User;
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

        DB::transaction(function () use ($request) {
            $fromAccount = $this->lockOwnedAccount($request->user(), $request->from_account_id);
            $toAccount = $this->lockOwnedAccount($request->user(), $request->to_account_id);

            $this->assertSufficientBalance($fromAccount, $request->amount);

            $transfer = $request->user()->transfers()->create([
                'from_account_id' => $fromAccount->id,
                'to_account_id' => $toAccount->id,
                'amount' => $request->amount,
                'date' => $request->date,
                'description' => $request->description,
            ]);

            $transfer->transaction()->createMany($this->transferLegs(
                $request->user(), $fromAccount, $toAccount, $request->amount, $request->date, $request->description,
            ));

            $this->applyTransfer($fromAccount, $toAccount, $request->amount);
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

        DB::transaction(function () use ($request, $transfer) {
            $oldFromAccount = Account::lockForUpdate()->findOrFail($transfer->from_account_id);
            $oldToAccount = Account::lockForUpdate()->findOrFail($transfer->to_account_id);
            $this->reverseTransfer($oldFromAccount, $oldToAccount, $transfer->amount);

            $newFromAccount = $this->lockOwnedAccount($request->user(), $request->from_account_id);
            $newToAccount = $this->lockOwnedAccount($request->user(), $request->to_account_id);

            $this->assertSufficientBalance($newFromAccount, $request->amount);

            $transfer->update([
                'from_account_id' => $newFromAccount->id,
                'to_account_id' => $newToAccount->id,
                'amount' => $request->amount,
                'date' => $request->date,
                'description' => $request->description,
            ]);

            $transfer->transaction()->delete();
            $transfer->transaction()->createMany($this->transferLegs(
                $request->user(), $newFromAccount, $newToAccount, $request->amount, $request->date, $request->description,
            ));

            $this->applyTransfer($newFromAccount, $newToAccount, $request->amount);
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

    /**
     * Lock an account belonging to the given user for update.
     */
    private function lockOwnedAccount(User $user, int $accountId): Account
    {
        return Account::whereBelongsTo($user)
            ->lockForUpdate()
            ->findOrFail($accountId);
    }

    /**
     * @throws ValidationException
     */
    private function assertSufficientBalance(Account $fromAccount, string|float $amount): void
    {
        if ($amount > $fromAccount->balance) {
            throw ValidationException::withMessages([
                'amount' => __('The amount exceeds the balance of the source account.'),
            ]);
        }
    }

    /**
     * Build the two transaction legs (out/in) that represent a transfer.
     *
     * @return array<int, array<string, mixed>>
     */
    private function transferLegs(
        User $user,
        Account $fromAccount,
        Account $toAccount,
        string|float $amount,
        string $date,
        ?string $description,
    ): array {
        return [
            [
                'user_id' => $user->id,
                'account_id' => $fromAccount->id,
                'amount' => $amount,
                'type' => TransactionType::TransferOut->value,
                'date' => $date,
                'description' => $description,
            ],
            [
                'user_id' => $user->id,
                'account_id' => $toAccount->id,
                'amount' => $amount,
                'type' => TransactionType::TransferIn->value,
                'date' => $date,
                'description' => $description,
            ],
        ];
    }

    /**
     * Move an amount from one account's balance to another's.
     */
    private function applyTransfer(Account $fromAccount, Account $toAccount, string|float $amount): void
    {
        $fromAccount->decrement('balance', (float) $amount);
        $toAccount->increment('balance', (float) $amount);
    }

    /**
     * Reverse a previously applied transfer between two accounts' balances.
     */
    private function reverseTransfer(Account $fromAccount, Account $toAccount, string|float $amount): void
    {
        $fromAccount->increment('balance', (float) $amount);
        $toAccount->decrement('balance', (float) $amount);
    }
}
