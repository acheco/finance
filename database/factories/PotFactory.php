<?php

namespace Database\Factories;

use App\Enums\Colors;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pot>
 */
class PotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->word(),
            'target_amount' => $this->faker->randomFloat(2, 100, 10000),
            'total_amount' => $this->faker->randomFloat(2, 0, 100),
            'theme' => Colors::GREEN->value,
        ];
    }
}
