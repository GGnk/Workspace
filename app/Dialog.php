<?php

namespace App;

use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Dialog extends Model
{

    public $thread;

    /**
     * Dialog constructor.
     * @param Thread $thread
     */
    public function __construct(Thread $thread)
    {
        $this->thread = $thread;

    }

    public function getAllChatsForUser($user) {
        $req_threads = $this->thread->forUser($user->id)->latest('updated_at')->get();
        $threads = collect();
        foreach ($req_threads as $thread) {
            $count = collect($thread);
            $count->put('latestMessage', $thread->latestMessage);
            $count->put('creator', $thread->users()->oldest()->first());
            $count->put('countPeople', $thread->participantsUserIds());
            $count->put('interlocutor', $thread->participantsString($user->id));
            $count->put('UnreadMessagesCount',$thread->userUnreadMessagesCount($user->id));
            $arr[] = $count;
            $threads['chats'] = $arr;
        }
        $threads['newThreadsCount'] = $user->newThreadsCount();

        return $threads;
    }
}
