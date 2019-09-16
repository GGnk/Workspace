<?php

namespace App;

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

class User extends Authenticatable {
    use TrDialog;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
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


    /**
     * Message relationship.
     *
     * @param Builder $query
     * @param $id
     * @return HasMany
     *
     * @codeCoverageIgnore
     */

    public function getAllChatsForUser($id) {
        $res = $this->findOrFail($id);
        $participantTable = (new Dialog\Participant())->getTable();
        $threadsTable = (new Dialog\Thread())->getTable();
        $req_threads = $res->threads()

            //Todo: Выгрузка последний не прочитанный сообщений выше всех остальных
            ->where(function ($query) use ($participantTable, $threadsTable) {
                $query->where($threadsTable . '.updated_at', '>',  $participantTable . '.last_read')
                    ->orWhereNull($participantTable . '.last_read');
            })
            ->wherePivot('deleted_at', null)

            ->with('creator')
            ->latest('updated_at')
            ->get();


        $threads = collect();
        foreach ($req_threads as $thread) {
            $count = collect($thread);
            $count->put('latestMessage', $thread->latestMessage);
            $count->put('countParticipants', count($thread->participantsUserIds()));
            $count->put('interlocutor', $thread->interlocutors($thread->option_thread));
            $count->put('UnreadMessagesCount',$thread->userUnreadMessagesCount($id));
            $arr[] = $count;
            $threads['chats'] = $arr;
        }
        $threads['newThreadsCount'] = $this->newThreadsCount();

        return $threads;
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
