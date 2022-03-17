<?php

namespace App\Models;

use App\Traits\HasUuid;
use Spatie\MediaLibrary\MediaCollections\Models\Media as BaseMedia;

class Media extends BaseMedia
{
    use HasUuid;
}
