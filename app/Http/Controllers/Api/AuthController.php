<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){
        // validate data
        $credentials = request()->validate([
            'email' => 'required|email|exists:users,email', 
            'password' => 'required|string|min:6'
        ]);
        
        // generate token jwt
        return $this->generateToken($credentials);
    }

    public function register(Request $request){
        // validate data
        $credentials = request()->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users', 
            'rol_id' => 'required|exists:rols,id',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // create object and save
        $input = $request->all();
        $user = new User();
        $user->fill($input);
        $user->password = Hash::make($input['password']);
        $user->save();

        // generate token jwt
        return $this->generateToken($credentials);
    }

    private function generateToken($credentials){
        if (! $token = auth()->attempt($credentials))
            return response(['error' => 'Unauthorized'], 401);

        return ([
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
    }
}
