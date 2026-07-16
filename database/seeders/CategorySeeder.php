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
        $categories = [
            ['name' => 'Entertainment', 'slug' => 'entertainment', 'color' => '#277C78', 'icon' => 'FilmSlateIcon'],
            ['name' => 'Bills', 'slug' => 'bills', 'color' => '#82C9D7', 'icon' => 'MoneyIcon'],
            ['name' => 'Grocery', 'slug' => 'food', 'color' => '#BE6C49', 'icon' => 'ForkKnifeIcon'],
            ['name' => 'Dining Out', 'slug' => 'dining-out', 'color' => '#F2CDAC', 'icon' => 'CheersIcon'],
            ['name' => 'Transportation', 'slug' => 'transportation', 'color' => '#CAB361', 'icon' => 'BusIcon'],
            ['name' => 'Personal Care', 'slug' => 'personal-care', 'color' => '#626070', 'icon' => 'HandHeartIcon'],
            ['name' => 'Education', 'slug' => 'education', 'color' => '#597C7C', 'icon' => 'GraduationCapIcon'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'color' => '#826CB0', 'icon' => 'FilmSlateIcon'],
            ['name' => 'Shopping', 'slug' => 'shopping', 'color' => '#3F82B2', 'icon' => 'ShoppingCartIcon'],
            ['name' => 'General', 'slug' => 'general', 'color' => '#AF81BA', 'icon' => 'InvoiceIcon'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['user_id' => null, 'slug' => $category['slug']],
                $category
            );
        }
    }
}
