<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function search(Request $request, User $user) {

    }
    public function searchInfo(Request $request, User $user) {

        if($request->has('keywords')) {
            $input = $request->input('keywords');

            $req = collect($user/*->setConnection('it_crud')*/
                                ->WhereRaw("MATCH(name, email, profession, phone) AGAINST('*$input*' IN BOOLEAN MODE)")
                                ->take(10)
                                ->get());

            $posts = collect(Posts::WhereRaw("MATCH(title, description) AGAINST('*$input*' IN BOOLEAN MODE)")
                ->take(5)
                ->get());

            $people =collect();
            $build = collect();
            $business = collect();

            $req->each(function ($item) use ($people,$build,$business) {
                $res = collect($item)->put('menu', false);
                switch ($res['sort']) {
                    case 1:
                        $people->push($res);
                        break;
                    case 2:
                        $build->push($res);
                        break;
                    case 3:
                        $business->push($res);
                        break;
                }

            });

            $result = collect();
            $result->put('people', $people);
            $result->put('build', $build);
            $result->put('business', $business);
            $result->put('posts', $posts);

            return $req->count() || $posts->count() ? $result : ['message' => 'По запросу ничего не найдено'];

        }

        return ['error' => 'Ваш запрос не выполнен, возможно произошел сбой'];
    }
}
