<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rol;

class HomeController extends Controller
{
    public function index(){
        $rols = Rol::all();
        return view('home', compact('rols'));
    }
}
