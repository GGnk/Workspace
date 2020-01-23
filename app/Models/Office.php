<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    public function house()
    {
        return $this->morphToMany(House::class, 'houselist');
    }
    public function users()
    {
        return $this->hasMany(User::class, 'users_id');
    }

    public function phone()
    {
        return $this->morphToMany(Phone::class, 'phonelist');
    }
}
