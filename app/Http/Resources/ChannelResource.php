<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ChannelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'description'   => $this->description,
            'image'         => $this->image,
            'user'          => UserResource::make($this->whenLoaded('user')),
            'subscriptions' => $this->when(isset($this->users_count), $this->users_count),
            'is_subscribed' => $this->when(isset($this->is_subscribed), $this->is_subscribed),
            'videos'        => $this->whenAppended('videos'),
        ];
    }
}
