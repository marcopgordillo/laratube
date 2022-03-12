<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->hasChannel(1, [
                'name'  => 'Marco Gordillo'
            ])
            ->create([
            'name'  => 'Marco Gordillo',
            'email' => 'marcopgordillo@gmail.com',
        ]);
    }
}
