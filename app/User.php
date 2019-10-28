<?php

namespace App;

use App\Models\Posts;
use App\Models\Role;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use App\Models\Dialog;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\Dialog as TrDialog;
use phpDocumentor\Reflection\Types\This;

class User extends Authenticatable {
    use TrDialog;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'users_id');
    }
    public function posts()
    {
        return $this->hasMany(Posts::class, 'users_id');
    }

    /**
     * Message relationship.
     *
     * @param User $user
     * @return HasMany
     *
     */

    public function getAllChatsForUser(User $user) {
        $participantTable = (new Dialog\Participant)->getTable();
        $threadsTable = (new Dialog\Thread)->getTable();

        $res = $user->threads()

            ->wherePivot('deleted_at', null)
            ->with('creator')


            ->latest($participantTable .'.updated_at')
            ->get();

        $req_threads = collect($res);

        $req_threads->each(function($thread) use ($user) {
            $thread['latestMessage'] = $thread->latestMessage;
            $thread['countParticipants'] = count($thread->participantsUserIds());
            $thread['interlocutor'] = $thread->interlocutors($thread->option_thread);
            $thread['UnreadMessagesCount'] = $thread->userUnreadMessagesCount($user->id);
        })
        ->sortBy('updated_at');

        $res_chats['chats'] = $req_threads;

        $res_chats['newThreadsCount'] = $this->newThreadsCount();

        return $res_chats;
    }


    /**
     * Returns the new messages count for user.
     *
     * @return int
     */
    public function newThreadsCount()
    {
        return $this->threadsWithNewMessages()->count();
    }


    /**
     * Returns all threads with new messages.
     *
     * @return Collection
     */
    public function threadsWithNewMessages()
    {
        return $this->threads()
            ->where(function (Builder $q) {
                $q->whereNull((new Dialog\Participant)->getTable() . '.last_read');
                $q->orWhere((new Dialog\Thread)->getTable() . '.updated_at', '>', $this->getConnection()->raw($this->getConnection()->getTablePrefix() . (new Dialog\Participant)->getTable() . '.last_read'));
            })->get();
    }


}
