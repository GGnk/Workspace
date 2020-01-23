<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = ['title','desc','priority', 'toDate','status','cat', 'general','completed','user_create','users_id'];
    protected $hidden = [];

    protected $with = ['house', 'files'];

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_create');
    }
    public function house()
    {
        return $this->morphToMany(House::class, 'houselist');
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'filelist');
    }
}
