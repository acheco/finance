<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\TransferFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Throwable;

/**
 * @property int $id
 * @property int $user_id
 * @property int $from_account_id
 * @property int $to_account_id
 * @property numeric $amount
 * @property string|null $description
 * @property string $date
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read Account $fromAccount
 * @property-read Account $toAccount
 * @property-read Collection<int, Transaction> $transaction
 * @property-read int|null $transaction_count
 * @property-read User $user
 *
 * @method static TransferFactory factory($count = null, $state = [])
 * @method static Builder<static>|Transfer newModelQuery()
 * @method static Builder<static>|Transfer newQuery()
 * @method static Builder<static>|Transfer query()
 * @method static Builder<static>|Transfer whereAmount($value)
 * @method static Builder<static>|Transfer whereCreatedAt($value)
 * @method static Builder<static>|Transfer whereDate($value)
 * @method static Builder<static>|Transfer whereDescription($value)
 * @method static Builder<static>|Transfer whereFromAccountId($value)
 * @method static Builder<static>|Transfer whereId($value)
 * @method static Builder<static>|Transfer whereToAccountId($value)
 * @method static Builder<static>|Transfer whereUpdatedAt($value)
 * @method static Builder<static>|Transfer whereUserId($value)
 * @method static Builder<static>|Transfer whereUser($value)
 * @method static Builder<static>|Transfer whereTransaction($value)
 * @method static Builder<static>|Transfer whereTransactionCount($value)
 *
 * @mixin Eloquent
 */
#[Fillable(['user_id', 'from_account_id', 'to_account_id', 'amount', 'date', 'description'])]
class Transfer extends Model
{
    /** @use HasFactory<TransferFactory> */
    use HasFactory;

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

            $fromAccount->increment('balance', (float) $this->amount);
            $toAccount->decrement('balance', (float) $this->amount);

            $this->transaction()->delete();
            $this->delete();
        });
    }

    /**
     * @return HasMany<Transaction, $this>
     */
    public function transaction(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
