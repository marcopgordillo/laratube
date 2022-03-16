<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function() {

    Route::middleware(['auth:sanctum', 'verified'])->group(function() {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::patch('/channels/{channel}/subscriptions/{subscription}', SubscriptionController::class)->name('channels.subscription');
    });
    Route::apiResource('channels', ChannelController::class)->only(['show', 'update']);

    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});
