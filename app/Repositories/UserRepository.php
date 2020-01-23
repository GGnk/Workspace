<?php
namespace App\Repositories;

use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository implements UserRepositoryInterface
{
    private $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function get($user_id)
    {
        return $this->users->findOrFail($user_id);
    }

    public function all()
    {
        return $this->users->latest()->get();
    }
    public function create($attributes)
    {
        try {
            $this->users->fill([
                'name'=> $attributes['name'],
                'email'=> $attributes['email'],
                'phone'=> $attributes['phone'],
                'profession'=> $attributes['profession'],
                'sort'=> $attributes['sort']
            ]);
            $this->users->saveOrFail();

            return $this->users->refresh();

        } catch (ModelNotFoundException $e) {
            return $e;
        }
    }

    public function update($user_id, array $user_data, $files = false)
    {
        $user = $this->users->find($user_id);

        $user->update($user_data);
        if (isset($user_data['files'])) $user->files()->createMany($user_data['files']);

        if($files) return $user->refresh();

        return true;
    }

    public function delete($user_ids)
    {
        return $this->users->destroy($user_ids);
    }
}
