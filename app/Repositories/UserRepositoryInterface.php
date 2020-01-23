<?php
namespace App\Repositories;

interface UserRepositoryInterface
{
    public function get($post_id);

    public function all();

    public function create($attributes);

    public function update($user_id, array $user_data, $files = false);

    public function delete($user_id);
}
