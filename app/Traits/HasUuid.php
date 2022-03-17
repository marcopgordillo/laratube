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
            if (is_null($model->getOriginal($model->getKeyName()))) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }

     /**
     * Override the getIncrementing() function to return false to tell
     * Laravel that the identifier does not auto increment (it's a string).
     *
     * @return bool
     */
    public function getIncrementing() : bool
    {
        return false;
    }


    /**
     * Tell laravel that the key type is a string, not an integer.
     *
     * @return string
     */
    public function getKeyType() : string
    {
        return 'string';
    }
}
