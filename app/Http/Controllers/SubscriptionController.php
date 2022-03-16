<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChannelResource;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SubscriptionController extends Controller
{
    public function __invoke(Request $request, Channel $channel, $subscription)
    {
        $channel->users()->toggle($subscription);

        $channel = $channel->load(['user'])
                        ->loadCount(['users']);

        $channel['is_subscribed'] = $channel->users->contains($subscription);

        return ChannelResource::make($channel);
    }
}
