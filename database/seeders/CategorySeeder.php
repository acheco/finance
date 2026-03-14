<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $systemCategories = [
            [
                'name' => 'General',
                'slug' => 'general',
                'color' => '#277C78',
                'image' => 'SquaresFourIcon',
            ],
            [
                'name' => 'Food',
                'slug' => 'food',
                'color' => '#F2CDAC',
                'image' => 'CookingPotIcon',
            ],
            [
                'name' => 'Transportation',
                'slug' => 'transportation',
                'color' => '#82C9D7',
                'image' => 'CarIcon',
            ],
            [
                'name' => 'Shopping',
                'slug' => 'shopping',
                'color' => '#626070',
                'image' => 'ShoppingBagIcon',
            ],
            [
                'name' => 'Health & Fitness',
                'slug' => 'health-fitness',
                'color' => '#826CB0',
                'image' => 'HeartIcon',
            ],
            [
                'name' => 'Entertainment',
                'slug' => 'entertainment',
                'color' => '#BE6C49',
                'image' => 'PopcornIcon',
            ],
            [
                'name' => 'Education',
                'slug' => 'education',
                'color' => '#AF81BA',
                'image' => 'GraduationCapIcon',
            ],
            [
                'name' => 'Bills',
                'slug' => 'bills',
                'color' => '#93674F',
                'image' => 'InvoiceIcon',
            ],
            [
                'name' => 'Lifestyle',
                'slug' => 'lifestyle',
                'color' => '#597C7C',
                'image' => 'CoffeeIcon',
            ],
            [
                'name' => 'Personal Care',
                'slug' => 'personal-care',
                'color' => '#934F6F',
                'image' => 'HeartbeatIcon',
            ],
            [
                'name' => 'Dining Out',
                'slug' => 'dining-out',
                'color' => '#7F9161',
                'image' => 'BowlSteamIcon',
            ],
            [
                'name' => 'Groceries',
                'slug' => 'groceries',
                'color' => '#CAB361',
                'image' => 'ShoppingCartIcon',
            ],
            [
                'name' => 'Travel',
                'slug' => 'travel',
                'color' => '#3F82B2',
                'image' => 'AirplaneTiltIcon',
            ],
        ];

        foreach ($systemCategories as $category) {
            Category::firstOrCreate(
                [
                    'slug' => $category['slug'],
                    'user_id' => null,
                ],
                [
                    'name' => $category['name'],
                    'color' => $category['color'],
                    'image' => $category['image'],
                ]
            );

        }

    }
}
