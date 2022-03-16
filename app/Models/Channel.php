<?php

namespace App\Models;

use App\AbstractModels\Model;
use App\Traits\HasSoftDeletes;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\{
    InteractsWithMedia,
    HasMedia,
    MediaCollections\Models\Media
};

class Channel extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasUuid, HasSoftDeletes;

    protected $fillable = [
        'name', 'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
                    ->as('subscription')
                    ->withTimestamps();
    }

    public function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) =>
                $this->media->first()
                    ? $this->media->first()->getFullUrl('thumb')
                    : null

        );
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(256)
            ->height(256)
            ->sharpen(10);
    }
}
