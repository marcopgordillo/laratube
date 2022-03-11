<?php

declare(strict_types = 1);

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HasUuid
{
    use SoftDeletes, Prunable;

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

    /**
     * Search models softDeleted to prune
     */
    public function prunable()
    {
        return static::where('created_at', '<=', now()->subMonth());
    }

    /**
     * Run this method before prune model
     */
    protected function pruning()
    {
        if (isset($this->image)) {
            Storage::delete($this->image);
        }
    }
}
