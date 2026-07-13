<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
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
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read User $user
 * @method static Builder<static>|Account newModelQuery()
 * @method static Builder<static>|Account newQuery()
 * @method static Builder<static>|Account query()
 * @method static Builder<static>|Account whereBalance($value)
 * @method static Builder<static>|Account whereColor($value)
 * @method static Builder<static>|Account whereCreatedAt($value)
 * @method static Builder<static>|Account whereIcon($value)
 * @method static Builder<static>|Account whereId($value)
 * @method static Builder<static>|Account whereIsActive($value)
 * @method static Builder<static>|Account whereName($value)
 * @method static Builder<static>|Account whereType($value)
 * @method static Builder<static>|Account whereUpdatedAt($value)
 * @method static Builder<static>|Account whereUserId($value)
 * @method static \Database\Factories\AccountFactory factory($count = null, $state = [])
 * @mixin \Eloquent
 */
#[Fillable(['name', 'type', 'balance', 'color', 'icon', 'is_active'])]
class Account extends Model
{
    use HasFactory;


    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
