<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use LazilyRefreshDatabase, WithFaker;

    public function test_user_can_be_registered()
    {
        $response = $this->postJson(route('auth.register'), [
            'name'                  => $this->faker->name,
            'email'                 => $this->faker->email,
            'password'              => 'Pa$$w0rd',
            'password_confirmation' => 'Pa$$w0rd',
        ]);

        $response->assertCreated()
                ->assertJsonPath('data.user.id', 1);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('users', ['id' => 1]);
    }

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'password'  => bcrypt('Pa$$w0rd'),
        ]);

        $response = $this->postJson(route('auth.login'), [
            'email'     => $user->email,
            'password'  => 'Pa$$w0rd',
        ]);

        $response->assertOk()
                ->assertJsonPath('data.user.id', $user->id);
    }

    public function test_cannot_login_with_wrong_credentials()
    {
        $user = User::factory()->create();

        $response = $this->postJson(route('auth.login'), [
            'email'     => $user->email,
            'password'  => 'BadPassword',
        ]);

        $response->assertUnprocessable()
                ->assertInvalid('error')
                ->assertJsonValidationErrors(['error' => 'The provided credentials are not correct.']);
    }
}
