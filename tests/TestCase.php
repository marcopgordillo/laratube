<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Laravel\Sanctum\Sanctum;


abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Set the currently logged in user for the application.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  string|null  $abilities
     * @return $this
     */
    public function actingAs(UserContract $user, $abilities = ['*'])
    {
        Sanctum::actingAs($user, $abilities);

        return $this;
    }
}
