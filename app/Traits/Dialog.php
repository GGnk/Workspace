<?php

namespace App\Traits;

use App\Models\Dialog\Thread;
use App\Models\Dialog\Participant;
use App\Models\Dialog\Message;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Collection;

trait Dialog
{

    public $thread;

    /**
     * Dialog constructor.
     * @param Thread $thread
     */
    public function bootDialog(Thread $thread)
    {
        $this->thread = $thread;
    }

    public function getAllChatsForUser($user) {

        $req_threads = $this->thread->ForUser($user->id)->latest('updated_at')->get();
        $threads = collect();
        foreach ($req_threads as $thread) {
            $count = collect($thread);
            $count->put('latestMessage', $thread->latestMessage);
            $count->put('creator', $thread->creator());
            $count->put('countPeople', $thread->participantsUserIds());
            /*$count->put('interlocutor', $thread->44($user->id));*/
            $count->put('UnreadMessagesCount',$thread->userUnreadMessagesCount($user->id));
            $arr[] = $count;
            $threads['chats'] = $arr;
        }
        $threads['newThreadsCount'] = $user->newThreadsCount();

        return $threads;
    }
}
