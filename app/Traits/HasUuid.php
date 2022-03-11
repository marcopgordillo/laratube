<?php

declare(strict_types = 1);

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuid
{
    protected static function boot()
    {
        parent::boot();

        /**
         * Change how to generate primary key value
         */
        static::creating(function (Model $model) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });
    }
}
