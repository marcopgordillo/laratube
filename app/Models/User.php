<?php

namespace App\Models;

use App\Traits\HasSoftDeletes;
use App\Traits\HasUuid;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuid, HasSoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function token(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->createToken('main', ['*'])->plainTextToken,
        );
    }

    public function channel(): HasOne
    {
        return $this->hasOne(Channel::class);
    }

    public function channels(): BelongsToMany
    {
        return $this->belongsToMany(Channel::class)
                    ->as('subscription')
                    ->withTimestamps();
    }
}
