<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Posts extends Model
{
    use Searchable;
    use SoftDeletes;

    protected $fillable = ['title','description','users_id'];
    protected $hidden = [];

    public function posts()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
