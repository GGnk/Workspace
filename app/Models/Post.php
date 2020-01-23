<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Post extends Model
{
    use Searchable;
    use SoftDeletes;

    protected $with = ['files', 'author'];

    protected $fillable = ['title','description', 'img','users_id'];
    protected $hidden = [];

    public function author()
    {
        return $this->belongsTo(User::class, 'users_id')->withDefault(['name'=>'Не известен!']);
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'filelist');
    }
}
