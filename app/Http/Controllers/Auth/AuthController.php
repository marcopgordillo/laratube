<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);

        event(new Registered($user));

        $token = $user->createToken('main', ['*'])->plainTextToken;

        return response([
            'data' => [
                'user'  => UserResource::make($user),
                'token' => $token,
            ],
        ], Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        throw_if(!Auth::attempt($credentials, $remember),
            ValidationException::withMessages([
                'error'   => 'The provided credentials are not correct.',
            ])
        );

        $user = Auth::user();
        $token = $user->createToken('main', ['*'])->plainTextToken;

        return response([
            'data' => [
                'user'  => UserResource::make($user),
                'token' => $token,
            ],
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        if ($user) {
            $user->currentAccessToken()->delete();
        }

        return response([
            'data' => [
                'success' => true,
            ]
        ], Response::HTTP_OK);
    }
}
