<?php
namespace App\Repositories;

interface PostRepositoryInterface
{
    public function get($post_id);

    public function all();

    public function create($attributes);

    public function update($post_id, array $post_data);

    public function delete($post_id);
}
