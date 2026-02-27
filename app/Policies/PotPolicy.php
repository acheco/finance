<?php

namespace App\Policies;

use App\Models\Pot;
use App\Models\User;

class PotPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Pot $pot): bool
    {
        return $user->id == $pot->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Pot $pot): bool
    {
        return $user->id == $pot->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Pot $pot): bool
    {
        return $user->id == $pot->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pot $pot): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pot $pot): bool
    {
        return false;
    }
}
