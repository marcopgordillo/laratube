<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Resources\ChannelResource;
use App\Http\Resources\VideoResource;
use App\Jobs\Videos\ConvertForStreaming;
use App\Models\Channel;
use App\Models\Media;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
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
            try {
                $video = $channel->addMedia($data['video'])
                    ->withCustomProperties([
                        'title'         => $data['title'],
                        'percentage'    => 0,
                    ])
                    ->toMediaCollection('videos');

                $this->dispatch(new ConvertForStreaming($video));

                $video['live_url'] = $this->getLiveUrl($video);
                return VideoResource::make($video);
            } catch (FileDoesNotExist $e) {
                throw ValidationException::withMessages([
                    'video' => 'File does not exists.'
                ]);
            } catch (FileIsTooBig $e) {
                throw ValidationException::withMessages([
                    'video' => 'File is Too Big.'
                ]);
            }
        }

        return response('', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Media $video): JsonResource
    {
        $video['live_url'] = $this->getLiveUrl($video);
        return VideoResource::make($video);
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

    private function getLiveUrl($video): string
    {
        return Storage::url("videos/{$video->id}/{$video->id}.m3u8");
    }
}
