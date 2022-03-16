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
        $joe = User::factory()
            ->hasChannel(1, [
                'name'  => 'Joe Doe'
            ])
            ->create([
            'name'  => 'Joe Doe',
            'email' => 'joe@doe.com',
        ]);

        $jane = User::factory()
            ->hasChannel(1, [
                'name'  => 'Jane Doe'
            ])
            ->create([
            'name'  => 'Jane Doe',
            'email' => 'jane@doe.com',
        ]);

        User::factory(100)
            ->hasChannel()
            ->hasAttached($joe->channel)
            ->create();

        User::factory(50)
            ->hasChannel()
            ->hasAttached($jane->channel)
            ->create();
    }
}
