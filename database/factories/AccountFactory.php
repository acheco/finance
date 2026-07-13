<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Account>
 */
class AccountFactory extends Factory
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
            'name' => fake()->words(2, true),
            'type' => fake()->randomElement(['cash', 'bank', 'credit_card']),
            'balance' => fake()->randomFloat(2, 0, 10000),
            'color' => fake()->hexColor(),
            'icon' => 'WalletIcon',
            'is_active' => true,
        ];
    }
}
