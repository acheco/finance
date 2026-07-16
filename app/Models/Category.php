<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\CategoryFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property int|null $user_id
 * @property string $name
 * @property string $slug
 * @property string $color
 * @property string $icon
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read Collection<int, User> $hiddenByUsers
 * @property-read int|null $hidden_by_users_count
 * @property-read User|null $user
 *
 * @method static CategoryFactory factory($count = null, $state = [])
 * @method static Builder<static>|Category forUser(User $user)
 * @method static Builder<static>|Category newModelQuery()
 * @method static Builder<static>|Category newQuery()
 * @method static Builder<static>|Category query()
 * @method static Builder<static>|Category whereColor($value)
 * @method static Builder<static>|Category whereCreatedAt($value)
 * @method static Builder<static>|Category whereIcon($value)
 * @method static Builder<static>|Category whereId($value)
 * @method static Builder<static>|Category whereName($value)
 * @method static Builder<static>|Category whereSlug($value)
 * @method static Builder<static>|Category whereUpdatedAt($value)
 * @method static Builder<static>|Category whereUserId($value)
 *
 * @mixin Eloquent
 */
#[Fillable(['name', 'color', 'icon', 'slug'])]
class Category extends Model
{
    /** @use HasFactory<CategoryFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsToMany<User, $this>
     */
    public function hiddenByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_user_hidden')->withTimestamps();
    }

    /**
     * Scope a query to include categories available for a specific user.
     *
     * @param  Builder<Category>  $query  The query builder instance.
     * @param  User  $user  The user instance.
     * @return Builder<Category> The modified query builder.
     */
    public function scopeForUser(Builder $query, User $user): Builder
    {
        return $query->where(function (Builder $q) use ($user) {
            $q->whereNull('user_id')
                ->orWhere('user_id', $user->id);
        })->whereDoesntHave('hiddenByUsers', function (Builder $q) use ($user) {
            $q->where('user_id', $user->id);
        });
    }
}
