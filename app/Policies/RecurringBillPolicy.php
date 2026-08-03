<?php

namespace App\Policies;

use App\Models\RecurringBill;
use App\Models\User;

class RecurringBillPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, RecurringBill $recurringBill): bool
    {
        return $user->id === $recurringBill->user_id;
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
    public function update(User $user, RecurringBill $recurringBill): bool
    {
        return $user->id === $recurringBill->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, RecurringBill $recurringBill): bool
    {
        return $user->id === $recurringBill->user_id;
    }
}
