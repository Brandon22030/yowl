<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Posts;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //making some face posts data for tests
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 10; $i++) {
            Posts::create([
                'title' => $faker->sentence,
                'image' => $faker->sentence,
                'content'  => $faker->sentence,
                'linked_url'  => $faker->sentence,
                'user_id' => 1,
                'categories_id' => 4
            ]);
        }
    }
}
