<?php

namespace App\Models;

use App\Enums\TransactionType;
use Carbon\CarbonImmutable;
use Database\Factories\TransactionFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $account_id
 * @property int|null $category_id
 * @property int|null $transfer_id
 * @property string|null $recipient
 * @property numeric $amount
 * @property TransactionType $type
 * @property string|null $description
 * @property CarbonImmutable $date
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read Account $account
 * @property-read Category|null $category
 * @property-read Transfer|null $transfer
 * @property-read User $user
 *
 * @method static TransactionFactory factory($count = null, $state = [])
 * @method static Builder<static>|Transaction newModelQuery()
 * @method static Builder<static>|Transaction newQuery()
 * @method static Builder<static>|Transaction query()
 * @method static Builder<static>|Transaction whereAccountId($value)
 * @method static Builder<static>|Transaction whereAmount($value)
 * @method static Builder<static>|Transaction whereCategoryId($value)
 * @method static Builder<static>|Transaction whereCreatedAt($value)
 * @method static Builder<static>|Transaction whereDate($value)
 * @method static Builder<static>|Transaction whereDescription($value)
 * @method static Builder<static>|Transaction whereId($value)
 * @method static Builder<static>|Transaction whereRecipient($value)
 * @method static Builder<static>|Transaction whereTransferId($value)
 * @method static Builder<static>|Transaction whereType($value)
 * @method static Builder<static>|Transaction whereUpdatedAt($value)
 * @method static Builder<static>|Transaction whereUserId($value)
 *
 * @property-read RecurringBill|null $recurringBill
 *
 * @mixin Eloquent
 */
#[Fillable(['user_id', 'account_id', 'category_id', 'transfer_id', 'recipient', 'amount', 'type', 'date', 'description', 'recurring_bill_id'])]
class Transaction extends Model
{
    /** @use HasFactory<TransactionFactory> */
    use HasFactory;

    protected $casts = [
        'date' => 'date',
        'type' => TransactionType::class,
    ];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsTo<Transfer, $this>
     */
    public function transfer(): BelongsTo
    {
        return $this->belongsTo(Transfer::class);
    }

    /**
     * @return BelongsTo<Account, $this>
     */
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    /**
     * @return BelongsTo<RecurringBill, $this>
     */
    public function recurringBill(): BelongsTo
    {
        return $this->belongsTo(RecurringBill::class);
    }
}
