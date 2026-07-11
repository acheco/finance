<?php

namespace App\Models;

use Database\Factories\AccountsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * @property int $id
 * @property int $user_id
 * @property string $name Account name
 * @property string $type cash, bank, credit_card, etc.
 * @property numeric $balance
 * @property string|null $color Hex color code
 * @property string|null $icon Icon name from Phosphor Icons
 * @property bool $is_active
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\AccountsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Accounts whereUserId($value)
 * @mixin \Eloquent
 */
class Accounts extends Model
{
    /** @use HasFactory<AccountsFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'balance',
        'color',
        'icon',
        'is_active',
    ];

    protected $casts = [
        'type' => 'string',
        'balance' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
