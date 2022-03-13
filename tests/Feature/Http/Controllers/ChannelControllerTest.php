<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Support\Str;
use Tests\TestCase;

class ChannelControllerTest extends TestCase
{
    use LazilyRefreshDatabase, WithFaker;

    public function test_guest_cant_get_a_channel()
    {
        $channel = Channel::factory()->for(User::factory())->create();

        $response = $this->getJson(route('channels.show', ['channel' => $channel->id]));

        $response->assertUnauthorized(); // 401
    }

    public function test_an_authenticated_user_can_get_a_channel()
    {
        $channel = Channel::factory()->for(User::factory())->create();
        $user = User::factory()->create();

        $this->actingAs($user);
        $response = $this->getJson(route('channels.show', ['channel' => $channel->id]));

        $response->assertOk()
                ->assertJsonPath('data.id', $channel->id);
    }

    public function test_a_channel_can_be_updated()
    {
        $user = User::factory()->create();
        $channel = Channel::factory()->for($user)->create([
            'name'  => 'Channel name',
        ]);

        $this->actingAs($user);
        $response = $this->putJson(route('channels.update', ['channel' => $channel->id]), [
            'name'  => 'Channel name updated',
        ]);

        $response->assertOk()
                ->assertJsonPath('data.name', 'Channel name updated');
    }

    public function test_the_image_of_a_channel_can_be_updated()
    {
        Storage::fake();

        $user = User::factory()->create();
        $channel = Channel::factory()->for($user)->create();
        $base64_image = "data:image/jpeg;base64, blahblahblah";

        $this->actingAs($user);
        $response = $this->putJson(route('channels.update', ['channel' => $channel->id]), [
            'name'      => 'Name updated',
            'image'     => $base64_image,
        ]);

        $response->assertOk()
                ->dump();
    }
}
