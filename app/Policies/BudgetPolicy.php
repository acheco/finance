<?php

namespace App\Policies;

use App\Models\Budget;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BudgetPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->id === Auth::user()->id;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Budget $budget): bool
    {
        return $user->id === $budget->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->id === Auth::user()->id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Budget $budget): bool
    {
        return $user->id === $budget->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Budget $budget): bool
    {
        return $user->id === $budget->user_id;
    }
}
