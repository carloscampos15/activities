<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function user(){
        $user = User::with('rol')->find(Auth::id());
        return ([
            'user' => $user,
            'message' => 'success',
        ]);
    }

    public function updateProfile(Request $request){
        // validate data
        $credentials = request()->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'rol_id' => 'required|exists:rols,id',
        ]);

        // get data from request and update model
        $input = $request->all();
        $user = Auth::user();
        $user->fill($input);
        $user->save();

        // retun user
        return $this->user();
    }

    public function updatePassword(Request $request){
        // validate data
        $credentials = request()->validate([
            'oldPassword' => ['required', 'string','min:6',
            function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::user()->password)) {
                    $fail(__('user_profile.current_password_doesnt_match'));
                }
            }],
            'password' => 'required|min:6|string|confirmed|different:oldPassword',
            'password_confirmation' => 'required|min:6|string'
        ]);

        // get data from request and update model
        $input = $request->all();
        $user = Auth::user();
        $user->password = Hash::make($input['password']);
        $user->save();

        // retun user
        return $this->user();
    }
}
