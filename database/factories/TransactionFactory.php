<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'account_id' => 1,
            'category_id' => fake()->numberBetween(1, 10),
            'recipient' => fake()->name(),
            'amount' => fake()->randomFloat(2, 0, 10000),
            'type' => fake()->randomElement(['income', 'expense']),
            'description' => fake()->sentence(),
            'date' => fake()->date(),
            'transfer_id' => null,
        ];
    }
}
