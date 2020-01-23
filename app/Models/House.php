<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    public function tasks()
    {
        return $this->morphedByMany(Task::class, 'houselist');
    }
    public function depts()
    {
        return $this->morphedByMany(Dept::class, 'houselist');
    }
    public function offices()
    {
        return $this->morphedByMany(Office::class, 'houselist');
    }
    public function users()
    {
        return $this->morphedByMany(User::class, 'houselist');
    }

    public function phones()
    {
        return $this->morphToMany(Phone::class, 'phonelist');
    }
    public function files()
    {
        return $this->morphToMany(File::class, 'filelist');
    }
}
