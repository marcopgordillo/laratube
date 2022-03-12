<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Support\Str;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use LazilyRefreshDatabase, WithFaker;

    public function test_user_can_be_registered()
    {
        $name = $this->faker->name;

        $response = $this->postJson(route('auth.register'), [
            'name'                  => $name,
            'email'                 => $this->faker->email,
            'password'              => 'Pa$$w0rd',
            'password_confirmation' => 'Pa$$w0rd',
        ]);

        $response->assertCreated()
                ->assertJsonCount(1)
                ->assertJson(fn (AssertableJson $json) =>
                    $json->has('data', fn ($json) =>
                        $json->whereType('id', 'string')
                            ->whereType('token', 'string')
                            ->where('name', $name)
                            ->has('channel', fn ($json) =>
                                $json->whereType('id', 'string')
                                    ->where('name', $name)
                                    ->etc()
                            )->etc()
                    )
                );

        $this->assertTrue(Str::isUuid($response->json('data.id')));
        $this->assertTrue(Str::isUuid($response->json('data.channel.id')));
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseCount('channels', 1);
        $this->assertDatabaseHas('users', ['name' => $name]);
        $this->assertDatabaseHas('channels', ['name' => $name]);
    }

    public function test_user_can_login()
    {
        $user = User::factory()
                ->hasChannel()
                ->create([
            'password'  => bcrypt('Pa$$w0rd'),
        ]);

        $response = $this->postJson(route('auth.login'), [
            'email'     => $user->email,
            'password'  => 'Pa$$w0rd',
        ]);

        $response->assertOk()
                ->assertJsonPath('data.id', $user->id)
                ->assertJsonPath('data.channel.id', $user->channel->id)
                ->assertJson(fn (AssertableJson $json) =>
                    $json->has('data', fn ($json) =>
                        $json->whereType('token', 'string')
                            ->etc()
                    )
                );

        $this->assertTrue(Str::isUuid($response->json('data.id')));
        $this->assertTrue(Str::isUuid($response->json('data.channel.id')));
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
