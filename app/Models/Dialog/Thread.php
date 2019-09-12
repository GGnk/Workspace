<?php

namespace App\Models\Dialog;

use App\Traits\Dialog;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use App\User;

class Thread extends Model
{
    use SoftDeletes;
    use Dialog;

    protected $fillable = [
        'subject'
    ];

    protected $hidden = [

    ];

    protected $dates = ['deleted_at'];

    /**
     * The relationship of users to the chat.
     *
     * @return HasMany
     *
     */
    public function participants()
    {
        return $this->hasMany(Participant::class, 'thread_id', 'id');
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
     * Returns the user object that created the chat.
     *
     * @return BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Returns the latest message from a chat.
     *
     * @return object
     */
    public function getLatestMessageAttribute()
    {
        return $this->messages()->select('body', 'user_id')->latest()->first();
    }

    public function interlocutors($option) {
        if($option == 1) return $this->users()->where('user_id', '!=', Auth::id())->first();
    }

    /**
     * Returns an array of user IDs associated with the chat.
     *
     * @param null|int $userId
     *
     * @return array
     */
    public function participantsUserIds($userId = null)
    {
        $users = $this->participants()->withTrashed()->select('user_id')->get()->map(function ($participant) {
            return $participant->user_id;
        });

        if ($userId !== null) {
            $users->push($userId);
        }

        return $users->toArray();
    }

    /**
     * Finds a member record by user ID.
     *
     * @param $userId
     *
     * @return mixed
     *
     * @throws ModelNotFoundException
     */
    public function getParticipantFromUser($userId)
    {
        return $this->participants()->where('user_id', $userId)->firstOrFail();
    }

    /**
     * Returns an array of unread messages in the stream for this user.
     *
     * @param int $userId
     *
     * @return Collection
     */
    public function userUnreadMessages($userId)
    {
        $messages = $this->messages()->where('user_id', '!=', $userId)->get();

        try {
            $participant = $this->getParticipantFromUser($userId);
        } catch (ModelNotFoundException $e) {
            return collect();
        }

        if (!$participant->last_read) {
            return $messages;
        }

        return $messages->filter(function ($message) use ($participant) {
            return $message->updated_at->gt($participant->last_read);
        });
    }

    /**
     * Returns the number of unread messages in the stream for this user.
     *
     * @param int $userId
     *
     * @return int
     */
    public function userUnreadMessagesCount($userId)
    {
        return $this->userUnreadMessages($userId)->count();
    }

}
