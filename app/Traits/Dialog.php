<?php

namespace App\Traits;

use App\User;
use App\Models\Dialog\Thread;
use App\Models\Dialog\Participant;
use App\Models\Dialog\Message;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
     * @return HasMany
     *
     */
    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    /**
     * The relationship of users to the chat.
     *
     * @return BelongsToMany
     *
     */
    public function users()
    {
        return $this->belongsToMany(User::class, Participant::class, 'thread_id', 'user_id');
    }

    /**
     * Thread relationship.
     *
     * @return BelongsToMany
     *
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

    /**
     * Restores all participants within a thread that has a new message.
     *
     * @return void
     */
    public function activateAllParticipants()
    {
        $participants = $this->participants()->withTrashed()->get();
        foreach ($participants as $participant) {
            $participant->restore();
        }
    }
    /**
     * Добавление пользователей в поток в качестве участников.
     *
     * @param array|mixed $userId
     *
     * @return void
     */
    public function addParticipant($userId)
    {
        $userIds = is_array($userId) ? $userId : (array) func_get_args();

        collect($userIds)->each(function ($userId) {
            $this->participants()->firstOrCreate([
                'user_id' => $userId,
                'thread_id' => $this->id,
            ]);
        });
    }
    /**
     * Remove participants from thread.
     *
     * @param array|mixed $userId
     *
     * @return void
     */
    public function removeParticipant($userId)
    {
        $userIds = is_array($userId) ? $userId : (array) func_get_args();

        $this->participants()->where('thread_id', $this->id)->whereIn('user_id', $userIds)->delete();
    }
}
