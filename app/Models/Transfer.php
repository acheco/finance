<?php

namespace App\Models;

use Database\Factories\TransferFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Throwable;

class Transfer extends Model
{
    /** @use HasFactory<TransferFactory> */
    use HasFactory;

    protected $fillable = [
        'from_account_id',
        'to_account_id',
        'amount',
        'date',
        'description',
    ];

    /**
     * @return HasMany<Transaction, $this>
     */
    public function transaction(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Account, $this>
     */
    public function fromAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'from_account_id');
    }

    /**
     * @return BelongsTo<Account, $this>
     */
    public function toAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'to_account_id');
    }

    /**
     * Reverse the balance changes this transfer applied to its accounts,
     * then delete the transfer and its transactions.
     *
     * @throws Throwable
     */
    public function reverseAndDelete(): void
    {
        DB::transaction(function () {
            $fromAccount = Account::lockForUpdate()->findOrFail($this->from_account_id);
            $toAccount = Account::lockForUpdate()->findOrFail($this->to_account_id);

            $fromAccount->increment('balance', $this->amount);
            $toAccount->decrement('balance', $this->amount);

            $this->transaction()->delete();
            $this->delete();
        });
    }
}
