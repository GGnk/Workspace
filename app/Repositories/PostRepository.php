<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostRepository implements PostRepositoryInterface
{
    private $posts;

    public function __construct(Post $posts)
    {
        $this->posts = $posts;
    }

    public function get($post_id)
    {
        return $this->posts->find($post_id);
    }

    public function all()
    {
        return $this->posts->latest()->get();
    }
    public function create($attributes)
    {
        try {
            $this->posts->fill([
                'title'=> $attributes['title'],
                'description'=> $attributes['description'],
                'users_id'=> $attributes['users_id'],
                'img'=> $attributes['img']
            ]);
            $this->posts->saveOrFail();

            $this->posts->files()->createMany($attributes['files']);
            return $this->posts->find($this->posts->id);

        } catch (ModelNotFoundException $e) {
            return $e;
        }
    }

    public function update($post_id, array $post_data)
    {
        return $this->posts->find($post_id)->update($post_data);
    }

    public function delete($post_id)
    {
        return $this->posts->destroy($post_id);
    }
}
