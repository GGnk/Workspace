<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getInfo(User $user) {
        $result = collect();
        $people = collect();
        $build = collect();
        $business = collect();

        for ($i = 1; $i <= 3; $i++) {
            $array = User::where('sort', $i)->get();

            $array->each(function ($item) use ($people,$build,$business) {
                switch ($item['sort']) {
                    case 1:
                        $people->push($item);
                        break;
                    case 2:
                        $build->push($item);
                        break;
                    case 3:
                        $business->push($item);
                        break;
                }

            });

        }
        $result->put('people',count($people));
        $result->put('build',count($build));
        $result->put('business',count($business));

        return $result;


    }

    public function searchInfo(Request $request) {

        if($request->has('keywords')) {
            $input = $request->input('keywords');

            $user = collect(User::WhereRaw("MATCH(name, email, profession, phone) AGAINST('*$input*' IN BOOLEAN MODE)")
                ->take(5)
                ->get());

            $posts = collect(Posts::WhereRaw("MATCH(title, description) AGAINST('*$input*' IN BOOLEAN MODE)")
                ->take(5)
                ->get());

            $people =collect();
            $build = collect();
            $business = collect();

            $user->each(function ($item) use ($people,$build,$business) {
                switch ($item['sort']) {
                    case 1:
                        $people->push($item);
                        break;
                    case 2:
                        $build->push($item);
                        break;
                    case 3:
                        $business->push($item);
                        break;
                }

            });

            $result = collect();
            $result->put('people', $people);
            $result->put('build', $build);
            $result->put('business', $business);
            $result->put('posts', $posts);

            return $user->count() || $posts->count() ? $result : ['message' => 'По запросу ничего не найдено'];

        }

        return ['error' => 'Ваш запрос не выполнен, возможно произошел сбой'];
    }
}
