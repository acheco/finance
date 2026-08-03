<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Category;
use App\Models\RecurringBill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RecurringBill>
 */
class RecurringBillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => Auth()->user()->id ?? 1,
            'account_id' => Account::factory(),
            'category_id' => Category::factory(),
            'name' => fake()->words(2, true),
            'amount' => fake()->randomFloat(2, 5, 500),
            'frequency' => 'monthly',
            'due_day' => fake()->numberBetween(1, 28),
            'next_due_date' => now()->addMonth(),
        ];
    }
}
