<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use App\Dialog;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

class DialogController extends Controller
{
    public function __construct()
    {

    }

    public function index(Thread $thread)
    {
        $user = Auth::user();

        // Выгружаем всех пользотелей для списка
        $users = User::where('id','!=',$user->id)->get();

        // Все потоки, в которых участвует пользователь c отношениями
        $req_threads = $thread->forUser($user->id)->latest('updated_at')->with(['messages.user'=> function ($query){
            $query->latest()->first();
        }])->get();
        $threads = collect();
        foreach ($req_threads as &$thread) {
            $count = collect($thread);
            $count->put('countPeople', $thread->participantsUserIds());
            $count->put('interlocutor', $thread->participantsString($user->id));
            $count->put('UnreadMessagesCount',$thread->userUnreadMessagesCount($user->id));

            $arr[] = $count;
            $threads['chat'] = $arr;
        }
        $threads['newThreadsCount'] = $user->newThreadsCount();


        // Все потоки, игнорировать удаленных / архивированных участников
        //$threads = Thread::getAllLatest()->get();

        // Все потоки, в которых участвует пользователь, с новыми сообщениями
        // $threads = Thread::forUserWithNewMessages(Auth::id())->latest('updated_at')->get();

        return view('layouts.index', compact('threads','users', 'user'));
    }



    /**
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show(Request $request)
    {

        try {
            $chat = Thread::findOrFail($request->chatID);
            collect($chat->messages)->each(function ($item) {
                $item->created = $item->created_at->diffForHumans();
                return $item->user;
            });
        } catch (ModelNotFoundException $e) {
            Session::flash('error_message', 'The thread with ID: ' . $request->chatID . ' was not found.');

            return redirect()->route('messages');
        }


        return compact('chat');
    }

    /**
     * Creates a new message thread.
     *
     * @return mixed
     */
    public function create()
    {

        $users = User::where('id', '!=', Auth::id())->get();

        return view('messenger.create', compact('users'));
    }

    /**
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
        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $input['message'],
        ]);

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

        return redirect()->route('messages.index');
    }

    /**
     * Adds a new message to a current thread.
     *
     * @param $id
     * @return mixed
     */
    public function update($id)
    {
        try {
            $thread = Thread::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            Session::flash('error_message', 'The thread with ID: ' . $id . ' was not found.');

            return redirect()->route('messages');
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

        return redirect()->route('messages.show', $id);
    }
}
