<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
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

    public function getInfo(User $user) {
        $result = collect();
        for ($i = 1; $i <= 3; $i++) {
            $user = User::where('sort', $i)->inRandomOrder()->limit(5)->get();
            $result->push($user);
        }
        return ['users' => $result->collapse()];


    }

    public function searchInfo(Request $request) {

        if($request->has('keywords')) {
            $input = $request->input('keywords');

            $user = User::WhereRaw("MATCH(name, email, profession, phone) AGAINST('*$input*' IN BOOLEAN MODE)")
                ->take(5)
                ->get();

            $result = ['users' => $user];

            return $result['users']->count() ? $result : ['error' => 'По запросу ничего не найдено'];

        }

        return ['error' => 'Ваш запрос не выполнен, возможно произошел сбой'];
    }

}
