<?php

namespace App\Models;

use App\Enums\TransactionType;
use Carbon\CarbonImmutable;
use Database\Factories\BudgetFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id
 * @property int $user_id
 * @property int $category_id
 * @property numeric $maximum
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read Category $category
 * @property-read User $user
 * @property-read numeric $spent
 *
 * @method static BudgetFactory factory($count = null, $state = [])
 * @method static Builder<static>|Budget newModelQuery()
 * @method static Builder<static>|Budget newQuery()
 * @method static Builder<static>|Budget query()
 * @method static Builder<static>|Budget whereCategoryId($value)
 * @method static Builder<static>|Budget whereCreatedAt($value)
 * @method static Builder<static>|Budget whereId($value)
 * @method static Builder<static>|Budget whereMaximum($value)
 * @method static Builder<static>|Budget whereUpdatedAt($value)
 * @method static Builder<static>|Budget whereUserId($value)
 * @method static Builder<static>|Budget withRecentCategoryTransactions(User $user)
 *
 * @mixin Eloquent
 */
#[Fillable(['user_id', 'category_id', 'maximum', 'created_at', 'updated_at'])]
class Budget extends Model
{
    /** @use HasFactory<BudgetFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to a user's budgets, eager loading each budget's category
     * along with the category's 3 most recent transactions for the current month,
     * plus a `spent` attribute with the category's total expenses for the current month.
     *
     * @param  Builder<Budget>  $query
     * @return Builder<Budget>
     */
    public function scopeWithRecentCategoryTransactions(Builder $query, User $user): Builder
    {
        $startOfMonth = CarbonImmutable::now()->startOfMonth();
        $endOfMonth = CarbonImmutable::now()->endOfMonth();

        $rankedTransactions = DB::table('transactions')
            ->selectRaw('id, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY date DESC, id DESC) AS rn')
            ->where('user_id', $user->id)
            ->whereBetween('date', [$startOfMonth, $endOfMonth]);

        $spentThisMonth = DB::table('transactions')
            ->selectRaw('COALESCE(SUM(amount), 0)')
            ->whereColumn('category_id', 'budgets.category_id')
            ->where('user_id', $user->id)
            ->where('type', TransactionType::Expense->value)
            ->whereBetween('date', [$startOfMonth, $endOfMonth]);

        return $query->whereBelongsTo($user)
            ->addSelect(['spent' => $spentThisMonth])
            ->with(['category.transactions' => function ($query) use ($user, $startOfMonth, $endOfMonth, $rankedTransactions) {
                $query->where('user_id', $user->id)
                    ->whereBetween('date', [$startOfMonth, $endOfMonth])
                    ->whereIn('id', function ($query) use ($rankedTransactions) {
                        $query->select('id')
                            ->fromSub($rankedTransactions, 'ranked_transactions')
                            ->where('rn', '<=', 3);
                    })
                    ->latest('date');
            }]);
    }
}
