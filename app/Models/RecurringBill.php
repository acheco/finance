<?php

namespace App\Models;

use Database\Factories\RecurringBillFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
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
 * @method static Builder<static>|RecurringBill newModelQuery()
 * @method static Builder<static>|RecurringBill newQuery()
 * @method static Builder<static>|RecurringBill query()
 * @method static Builder<static>|RecurringBill whereAccountId($value)
 * @method static Builder<static>|RecurringBill whereCategoryId($value)
 * @method static Builder<static>|RecurringBill whereCreatedAt($value)
 * @method static Builder<static>|RecurringBill whereDueDay($value)
 * @method static Builder<static>|RecurringBill whereId($value)
 * @method static Builder<static>|RecurringBill whereName($value)
 * @method static Builder<static>|RecurringBill whereNextDueDate($value)
 * @method static Builder<static>|RecurringBill whereUpdatedAt($value)
 * @method static Builder<static>|RecurringBill whereUserId($value)
 * @method static Builder<static>|RecurringBill paid()
 * @method static Builder<static>|RecurringBill upcoming()
 * @method static Builder<static>|RecurringBill dueSoon()
 *
 * @mixin Eloquent
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
     * Filter the query to only include paid recurring bills.
     *
     * @param  Builder<RecurringBill>  $query
     * @return Builder<RecurringBill>
     */
    public function scopePaid(Builder $query): Builder
    {
        return $query->where('next_due_date', '<', now()->toDateString());
    }

    /**
     * Filter the query to only include upcoming recurring bills.
     *
     * @param  Builder<RecurringBill>  $query
     * @return Builder<RecurringBill>
     */
    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('next_due_date', '>', now()->addDays(3)->toDateString());
    }

    /**
     * Filter the query to only include recurring bills that are due soon.
     *
     * @param  Builder<RecurringBill>  $query
     * @return Builder<RecurringBill>
     */
    public function scopeDueSoon(Builder $query): Builder
    {
        return $query->whereBetween('next_due_date', [now()->toDateString(), now()->addDays(3)->toDateString()]);
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
