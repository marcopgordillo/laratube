<?php

namespace App\Http\Requests;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreVideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        /** @var User */
        $user = Auth::user();
        return $user !== null && $user->can('update', [Channel::class, $this->channel]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'          => ['required', 'string', 'max:255'],
            'video'         => ['required', 'mimetypes:video/*'],
        ];
    }
}
