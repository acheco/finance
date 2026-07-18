<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //        User::factory()->create([
        //            'name' => 'Jon Doe',
        //            'email' => 'jdoe@example.com',
        //            'password' => bcrypt('Password'),
        //        ]);
        //
        //        Account::factory(15)->create();
        //        Category::factory(15)->create();

        Transaction::factory(15)->create();

        $this->call([
            CategorySeeder::class,
        ]);

    }
}
