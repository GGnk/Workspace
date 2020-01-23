<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    protected $input;

    public function __construct(Request $request)
    {
        $this->input = $request->input('keywords');
    }


    public function search(User $user, Post $post) {
        if($this->input) {
            $contacts = $user::search($this->input)->take(20)->get();
            $posts = $post::search($this->input)->get();

            return $this->getDataCompact(compact('contacts','posts'));
        }
        return ['error' => 'Ваш запрос не выполнен, возможно произошел сбой'];
    }

    public function searchInfo(User $user, Post $post) {
        if($this->input) {

            $contacts = collect($user/*->setConnection('it_crud')*/
                                ::WhereRaw("MATCH(name, email, profession, phone, actual_address) AGAINST('*$this->input*' IN BOOLEAN MODE)")
                                ->take(20)
                                ->get());

            $posts = collect($post::WhereRaw("MATCH(title, description) AGAINST('*$this->input*' IN BOOLEAN MODE)")
                ->take(5)
                ->get());

            return $this->getDataCompact(compact('contacts','posts'));

        }

        return ['error' => 'Ваш запрос не выполнен, возможно произошел сбой'];
    }
    public function getPostsSearch(Post $post) {
        if($this->input) {

            $posts = collect($post::WhereRaw("MATCH(title, description) AGAINST('*$this->input*' IN BOOLEAN MODE)")
                ->take(5)
                ->get());

            return $posts->count() ? $posts : ['message' => 'По запросу ничего не найдено'];
        }

        return ['error' => 'Ваш запрос не выполнен, возможно произошел сбой'];
    }

    public function getDataCompact($data = [])
    {
        $people =collect();
        $build = collect();
        $business = collect();

        $data['contacts']->each(function ($item) use ($people,$build,$business) {
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
        $result->put('posts', $data['posts']);

        return $data['contacts']->count() || $data['posts']->count() ? $result : ['message' => 'По запросу ничего не найдено'];
    }
}
