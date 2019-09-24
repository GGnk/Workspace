<?php

namespace App\Models;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dep extends Model
{
    use SoftDeletes;

    protected $fillable = ['name','lat','lon'];
    protected $hidden = [];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'deps_id');
    }
}
