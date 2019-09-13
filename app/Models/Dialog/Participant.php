<?php

namespace App\Models\Dialog;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Participant extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'thread_id', 'user_id', 'last_read'
    ];
}
