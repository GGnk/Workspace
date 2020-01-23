<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Post;

use App\Repositories\PostRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
    protected $posts;

    public function __construct(PostRepositoryInterface $posts)
    {
        $this->posts = $posts;
    }

    /**
     * Returns a list of posts.
     *
     * @return array
     */
    public function index() : array
    {
        try {
            return [
                'posts' => $this->posts->all(),
                'message' => [
                    'type' => 'success',
                    'text' => ""
                ]
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'message' => [
                    'type' => 'info',
                    'text' => "Ничего не найдено, ошибка: $e"
                ]
            ];
        }


    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param File $file
     * @return array
     */
    public function store(Request $request, File $file)
    {
        try {
            $files = $request->allFiles();
            $path = $file->uploadFiles($files, 'post_img');
            $post = $this->posts->create($request->all('title', 'description')+[ 'users_id'=> Auth::id(), 'img' => $path['path_img'], 'files'=>$path['path_files']->toArray()]);

            return [
                'post' => $post,
                'message' => [
                    'type' => 'success',
                    'text' => 'Ваш пост опубликован!'
                ]
            ];
        } catch (\Exception $e) {
            return [
                'message' => [
                'type' => 'warning',
                'text' => "Произошла ошибка! {$e}"
                ]
            ];
        }

    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $posts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $posts)
    {
        //
    }
}
