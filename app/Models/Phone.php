<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    public function houses()
    {
        return $this->morphedByMany(House::class, 'phonelist');
    }
    public function depts()
    {
        return $this->morphedByMany(Dept::class, 'phonelist');
    }
    public function offices()
    {
        return $this->morphedByMany(Office::class, 'phonelist');
    }
    public function users()
    {
        return $this->morphedByMany(User::class, 'phonelist');
    }
}
