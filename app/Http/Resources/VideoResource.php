<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            'live_url'      => $this->live_url,
            'thumb'         => $this->getUrl('thumb'),
            'title'         => $this->getCustomProperty('title'),
            'percentage'    => $this->getCustomProperty('percentage'),
        ];
    }
}
