<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function InitialBoot(User $user) {
        $auth = UserController::getCheckAuth();
        if($auth) {
            return [
                'auth' => true,
                'user' => $user->where('id', Auth::id())->with('role')->get(),
                'setting' => [
                    'default' => 1
                ]
            ];
        } else {
            return [
                'auth' => $auth
            ];
        }
    }


}
