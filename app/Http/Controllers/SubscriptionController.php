<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChannelResource;
use App\Models\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SubscriptionController extends Controller
{
    public function __invoke(Request $request, Channel $channel)
    {
        /** @var User */
        $user = Auth()->user();
        $channel->users()->toggle($user->id);

        $channel = $channel->load(['user'])
                        ->loadCount(['users']);

        $channel['is_subscribed'] = $channel->users->contains($user->id);

        return ChannelResource::make($channel);
    }
}
