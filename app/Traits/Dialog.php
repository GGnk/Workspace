<?php

namespace App\Traits;

use App\User;
use App\Models\Dialog\Thread;
use App\Models\Dialog\Participant;
use App\Models\Dialog\Message;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Collection;

trait Dialog
{

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * Participants relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     *
     * @codeCoverageIgnore
     */
    public function participants()
    {
        return $this->hasMany(Participant::class);
    }


    /**
     * Thread relationship.
     *
     * @return BelongsToMany
     *
     * @codeCoverageIgnore
     */
    public function threads()
    {
        return $this->belongsToMany(
            Thread::class,
            Participant::class
            /*'user_id',
            'thread_id'*/
        );
    }


}
