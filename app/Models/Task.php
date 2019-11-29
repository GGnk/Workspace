<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = ['title','desc','priority', 'toDate','status','cat','deps_id', 'general','completed','user_create','users_id','file',];
    protected $hidden = [];

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_create');
    }
    public function dep()
    {
        return $this->belongsTo(Dep::class, 'deps_id');
    }
}
