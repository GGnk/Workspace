<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

class DialogController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        return view('layouts.index');
    }

    public function fetchAll(Thread $thread) {
        $auth_user = Auth::user();

        // Выгружаем всех пользотелей для списка
        $users = User::where('id','!=',$auth_user->id)->get();
        $users_list = User::all();
        // Все потоки, в которых участвует пользователь c отношениями
        $req_threads = $thread->forUser($auth_user->id)->latest('updated_at')->get();
        $threads = collect();
        foreach ($req_threads as &$thread) {
            $count = collect($thread);
            $count->put('latestMessage', $thread->latestMessage);
            $count->put('creator', $thread->users()->oldest()->first());
            $count->put('countPeople', $thread->participantsUserIds());
            $count->put('interlocutor', $thread->participantsString($auth_user->id));
            $count->put('UnreadMessagesCount',$thread->userUnreadMessagesCount($auth_user->id));

            $arr[] = $count;
            $threads['chat'] = $arr;
        }
        $threads['newThreadsCount'] = $auth_user->newThreadsCount();


        // Все потоки, игнорировать удаленных / архивированных участников
        //$threads = Thread::getAllLatest()->get();

        // Все потоки, в которых участвует пользователь, с новыми сообщениями
        // $threads = Thread::forUserWithNewMessages(Auth::id())->latest('updated_at')->get();

        return compact('threads','users', 'auth_user', 'users_list');
    }

    /*
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show($id = null)
    {
        if (!$id){
            $id = Input::get('id');
        }

        try {
            $chat = Thread::findOrFail($id);
            collect($chat->messages)->each(function ($item) {
                $item->created = $item->created_at->diffForHumans();
                return $item->user;
            });
        } catch (ModelNotFoundException $e) {
            return 'The thread with ID: ' . $id . ' was not found';
        }

        $users = User::whereIn('id', $chat->participantsUserIds())->get();
        $chat->markAsRead(Auth::id());

        return compact('chat','users');
    }

    /*
     * Creates a new message thread.
     *
     * @return mixed
     */
    public function create()
    {

        $users = User::where('id', '!=', Auth::id())->get();

        return view('messenger.create', compact('users'));
    }

    /*
     * Stores a new message thread.
     *
     * @return mixed
     */
    public function store()
    {
        $input = Input::all();

        $thread = Thread::create([
            'subject' => $input['subject'],
        ]);

        // Message
        if ($input['message']) {
            Message::create([
                'thread_id' => $thread->id,
                'user_id' => Auth::id(),
                'body' => $input['message'],
            ]);
        }

        // Sender
        Participant::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'last_read' => new Carbon,
        ]);

        // Recipients
        if (Input::has('recipients')) {
            $thread->addParticipant($input['recipients']);
        }
        return $this->show($thread->id);

    }

    /*
     * Adds a new message to a current thread.
     *
     * @param $id
     * @return mixed
     */
    public function update()
    {
        try {
            $thread = Thread::findOrFail(Input::get('id'));
        } catch (ModelNotFoundException $e) {
            Session::flash('error_message', 'The thread with ID: ' . Input::get('id') . ' was not found.');

            return $e;
        }

        $thread->activateAllParticipants();

        // Message
        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => Input::get('message'),
        ]);

        // Add replier as a participant
        $participant = Participant::firstOrCreate([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
        ]);
        $participant->last_read = new Carbon;
        $participant->save();

        // Recipients
        if (Input::has('recipients')) {
            $thread->addParticipant(Input::get('recipients'));
        }

        return $this->show(Input::get('id'));
    }
}
