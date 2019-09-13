<?php

namespace App\Models\Dialog;

use Illuminate\Database\Eloquent\Model;
use App\User;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Dialog;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;


class Thread extends Model
{
    use SoftDeletes;
    use Dialog;

    protected $fillable = [
        'subject', 'user_id'
    ];

    protected $hidden = [

    ];

    protected $dates = ['deleted_at'];



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
        return $this->messages()->with('user')->latest()->first();
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

    /**
     * Mark the chat as read for the user.
     *
     * @param int $userId
     *
     * @return ModelNotFoundException
     * @throws
     */
    public function markAsRead($userId)
    {
        try {
            $participant = $this->getParticipantFromUser($userId);
            $participant->last_read = new Carbon();
            $participant->save();
        } catch (ModelNotFoundException $e) {
            return $e;
        }
    }

}
