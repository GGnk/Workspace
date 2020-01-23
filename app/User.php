<?php

namespace App;

use App\Models\Dept;
use App\Models\File;
use App\Models\House;
use App\Models\Office;
use App\Models\Phone;
use App\Models\Post;
use App\Models\Role;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use App\Models\Dialog;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\Dialog as TrDialog;
use Laravel\Scout\Searchable;

class User extends Authenticatable {
    use TrDialog;
    use Notifiable;
    use Searchable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'img', 'phone', 'profession','sort', 'birthdate', 'actual_address', 'depts_id', 'offices_id', 'roles_id', 'pin'
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
    public function isSuperAdmin(){
        return $this->roles_id == 1;
    }
    public function isAdmin(){
        return $this->roles_id == 2;
    }
    public function isNotAdmin(){
        return $this->roles_id > 2 || empty($this->roles_id);
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function dept()
    {
        return $this->belongsTo(Dept::class, 'role_id');
    }

    public function office()
    {
        return $this->belongsTo(Office::class, 'role_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'users_id');
    }
    public function posts()
    {
        return $this->hasMany(Post::class, 'users_id');
    }

    public function house()
    {
        return $this->morphToMany(House::class, 'houselist');
    }

    public function phone()
    {
        return $this->morphToMany(Phone::class, 'phonelist');
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'filelist');
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
