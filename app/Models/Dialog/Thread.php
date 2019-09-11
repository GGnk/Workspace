<?php

namespace App\Models\Dialog;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;

class Thread extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'subject'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Internal cache for creator.
     *
     * @var null|User|Model
     */
    protected $creatorCache;

    /**
     * Messages relationship.
     *
     * @return HasMany
     *
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'thread_id', 'id');
    }

    /**
     * Returns the latest message from a thread.
     *
     * @return Eloquent|HasMany|object
     */
    public function getLatestMessageAttribute()
    {
        return $this->messages()->latest()->first();
    }

    /**
     * Отношения участников.
     *
     * @return HasMany
     *
     */
    public function participants()
    {
        return $this->hasMany(Participant::class, 'thread_id', 'id');
    }

    /**
     * Отношения пользователя.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     *
     * @codeCoverageIgnore
     */
    public function users()
    {
        return $this->belongsToMany(User::class, Participant::class, 'thread_id', 'user_id');
    }


    public function ForUser($userId, Builder $query)
    {
        $participantsTable = (new Participant)->getTable();
        $threadsTable = $this->getTable();

        return $query->join($participantsTable, $this->getQualifiedKeyName(), '=', $participantsTable . '.thread_id')
            ->where($participantsTable . '.user_id', $userId)
            ->whereNull($participantsTable . '.deleted_at')
            ->select($threadsTable . '.*');
    }
    /**
     * Возвращает объект user, который создал поток.
     *
     * @return null|User|Model
     */
    public function creator()
    {
        if ($this->creatorCache === null) {
            $firstMessage = $this->messages()->withTrashed()->oldest()->first();
            $this->creatorCache = $firstMessage ? $firstMessage->user : User::class;
        }

        return $this->creatorCache;
    }


    /**
     * Возвращает массив идентификаторов пользователей, связанных с потоком.
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
     * Находит запись участника по идентификатору пользователя.
     *
     * @param $userId
     *
     * @return mixed
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function getParticipantFromUser($userId)
    {
        return $this->participants()->where('user_id', $userId)->firstOrFail();
    }

    /**
     * Возвращает массив непрочитанных сообщений в потоке для данного пользователя.
     *
     * @param int $userId
     *
     * @return \Illuminate\Support\Collection
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
     * Возвращает количество непрочитанных сообщений в потоке для данного пользователя.
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
