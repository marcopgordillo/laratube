<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateChannelRequest;
use App\Http\Resources\ChannelResource;
use App\Models\Channel;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class ChannelController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'verified'])->only(['update']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Channel $channel)
    {
        $channel = $channel->load(['user'])
                        ->loadCount(['users']);

        $channel['is_subscribed'] = $channel->users->contains($request->logged_id);

        return ChannelResource::make($channel);
    }

    public function update(UpdateChannelRequest $request, Channel $channel)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $channel->clearMediaCollection('images');
            $channel->addMedia($data['image'])
                    ->toMediaCollection('images');
        }

        $channel->update($data);

        return ChannelResource::make($channel);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Channel $channel)
    {
        //
    }

    protected function saveImage($base64Image)
    {
        throw_if(
            !preg_match('/^data:image\/(\w+);base64,(.+)/', $base64Image, $result),
            ValidationException::withMessages(['image' => 'Did not match data URI with image data'])
        );
        $type = strtolower($result[1]); // jpg, png, gif
        $fileData = $result[2];
        $fileData = str_replace(' ', '+', $fileData);
        $fileData = base64_decode($fileData);

        throw_if(
            !$fileData,
            ValidationException::withMessages(['image' => 'Base64 decode failed'])
        );

        $imageName = 'images/' . Str::random() . ".{$type}";
        Storage::put($imageName, $fileData);
        return $imageName;
    }
}
