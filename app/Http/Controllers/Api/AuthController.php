<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\ApiCode;
use App\Models\User;

class AuthController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request){
        // validate data
        $credentials = request()->validate([
            'email' => 'required|email|exists:users,email', 
            'password' => 'required|string|min:8'
        ]);
        
        // generate token jwt
        $token = $this->generateToken($credentials);

        if($token)
            // return user and token
            return ([
                'user' => Auth::user(),
                'access_token' => $token,
                'token_type' => 'bearer',
            ]);
        else
            // return error unauthorized
            return response(['error' => 'Unauthorized'], 401);
    }

    public function register(Request $request){
        // validate data
        $credentials = request()->validate([
            'name' => 'required|string|max:255',
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
        $token = $this->generateToken($credentials);

        // return user and token
        return ([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
        ]);
    }

    private function generateToken($credentials){
        if (! $token = auth()->attempt($credentials))
            return false;
        return $token;
    }
}
