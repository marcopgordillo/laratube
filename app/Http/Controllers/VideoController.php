<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Resources\ChannelResource;
use App\Jobs\Videos\ConvertForStreaming;
use App\Models\Channel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Validation\ValidationException;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Channel $channel)
    {
        return $channel->videos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws ValidationException
     */
    public function store(StoreVideoRequest $request, Channel $channel): JsonResource
    {
        $data = $request->validated();

        if (isset($data['video'])) {
            $channel->clearMediaCollection('videos');
            try {
                $media = $channel->addMedia($data['video'])
                    ->withCustomProperties(['title' => $data['title']])
                    ->toMediaCollection('videos');
            } catch (FileDoesNotExist $e) {
                throw ValidationException::withMessages([
                    'video' => 'File does not exists.'
                ]);
            } catch (FileIsTooBig $e) {
                throw ValidationException::withMessages([
                    'video' => 'File is Too Big.'
                ]);
            }

            $this->dispatch(new ConvertForStreaming($media));
        }

        $channel->append('videos');

        return ChannelResource::make($channel);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
