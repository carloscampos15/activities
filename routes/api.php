<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

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

// frontend
// https://blog.sqreen.com/authentication-best-practices-vue/

// backend with jwt
// https://jwt-auth.readthedocs.io/en/develop/

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/user', [UserController::class, 'user'])->name('user');
    Route::post('/updateProfile', [UserController::class, 'updateProfile'])->name('updateProfile');
    Route::post('/updatePassword', [UserController::class, 'updatePassword'])->name('updatePassword');
    // Route::post('logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');
});