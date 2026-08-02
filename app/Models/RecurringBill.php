<?php

namespace App\Models;

use Database\Factories\RecurringBillFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read Account|null $account
 * @property-read Category|null $category
 * @property-read string $status
 * @property-read Collection<int, Transaction> $transactions
 * @property-read int|null $transactions_count
 * @property-read User|null $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecurringBill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecurringBill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RecurringBill query()
 *
 * @mixin \Eloquent
 */
#[Fillable(['user_id', 'account_id', 'category_id', 'name', 'amount', 'frequency', 'due_day', 'next_due_date'])]
class RecurringBill extends Model
{
    /** @use HasFactory<RecurringBillFactory> */
    use HasFactory;

    protected $casts = [
        'amount' => 'decimal:2',
        'due_day' => 'integer',
        'next_due_date' => 'date',
    ];

    protected $appends = ['status'];

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
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return HasMany<Transaction, $this>
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function getStatusAttribute(): string
    {
        $daysUntil = now()->diffInDays($this->next_due_date, false);

        return match (true) {
            $daysUntil < 0 => 'paid',
            $daysUntil <= 3 => 'due_soon',
            default => 'upcoming',
        };
    }
}
