<?php

namespace App\Jobs\Videos;

use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use FFMpeg\Format\Video\X264;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

class ConvertForStreaming implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(public Media $video)
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $low = (new X264('aac'))->setKiloBitrate(100); //360p
        $mid = (new X264('aac'))->setKiloBitrate(250);
        $high = (new X264('aac'))->setKiloBitrate(500);

        $pathToFile = "videos/{$this->video->id}/{$this->video->id}.m3u8";

        FFMpeg::fromDisk('public')
            ->open("{$this->video->id}/{$this->video->getAttribute('file_name')}")
            ->exportForHLS()
            ->onProgress(function ($percentage) {
                $this->video->setCustomProperty('percentage', $percentage)->save();
            })
            ->addFormat($low)
            ->addFormat($mid)
            ->addFormat($high)
            ->save($pathToFile);
    }
}
