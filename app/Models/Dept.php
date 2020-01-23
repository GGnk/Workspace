<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Dept extends Model
{
    public function house()
    {
        return $this->morphToMany(House::class, 'houselist');
    }
    public function users()
    {
        return $this->hasMany(User::class, 'users_id');
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
