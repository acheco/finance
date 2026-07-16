<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $name Index name
 * @property AccountType $type cash, bank, credit_card, etc.
 * @property numeric $balance
 * @property string|null $color Hex color code
 * @property string|null $icon Icon name from Phosphor Icons
 * @property bool $is_active
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read User $user
 * @method static \Database\Factories\AccountFactory factory($count = null, $state = [])
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
 * @mixin Eloquent
 */
	class Account extends \Eloquent {}
}

namespace App\Models{
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
 * @method static \Database\Factories\CategoryFactory factory($count = null, $state = [])
 * @method static Builder<static>|Category forUser(\App\Models\User $user)
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
 * @mixin \Eloquent
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property CarbonImmutable|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property CarbonImmutable|null $two_factor_confirmed_at
 * @property-read Collection<int, Account> $account
 * @property-read int|null $account_count
 * @property-read Collection<int, Category> $categories
 * @property-read int|null $categories_count
 * @property-read Collection<int, Category> $hiddenCategories
 * @property-read int|null $hidden_categories_count
 * @property-read DatabaseNotificationCollection<int, DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read Collection<int, Passkey> $passkeys
 * @property-read int|null $passkeys_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	class User extends \Eloquent implements \Laravel\Fortify\Contracts\PasskeyUser, \Laravel\Passkeys\Contracts\PasskeyUser {}
}

