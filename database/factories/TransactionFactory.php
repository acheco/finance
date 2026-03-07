<?php

namespace Database\Factories;

class TransactionFactory extends \Illuminate\Database\Eloquent\Factories\Factory
{
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'category_id' => \App\Models\Category::factory(),
            'name' => fake()->words(3, true),
            'amount' => fake()->randomFloat(2, -1000, 1000),
            'date' => fake()->date(),
            'is_recurring' => fake()->boolean(),
        ];
    }
}
