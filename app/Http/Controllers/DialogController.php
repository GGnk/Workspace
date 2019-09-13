<?php

namespace App\Http\Controllers;

use App\Events\ChatCreated;
use App\Events\Chats;
use App\Events\ChatRemoved;

use App\User;
use App\Models\Dialog;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Models;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Builder;
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

    /**
     * All threads in which the user has a relationship.
     *
     * @param User $user
     * @return mixed
     */
    public function fetchAll(User $user) {
        $auth_user = Auth::user();

        // Выгружаем всех пользотелей для списка
        $users_list = User::all()->take(5);

        // Все потоки, в которых участвует пользователь c отношениями
        $result = $user->getAllChatsForUser($auth_user->id);

        return compact('result', 'users_list', 'auth_user');
    }

    /**
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
            $chat = Dialog\Thread::select('id')->with('messages.user')->findOrFail($id);

            collect($chat['messages'])->each(function ($item) {
                $item->created = $item->created_at->diffForHumans();
            });
        } catch (ModelNotFoundException $e) {
            return 'The thread with ID: ' . $id . ' was not found';
        }

        $chat->markAsRead(Auth::id());
        return compact("chat");

    }


    /**
     * Creates a new chat.
     *
     * @param Dialog\Thread $thread
     * @return mixed
     * @throws Exception
     */
    public function store()
    {
        $input = Input::all();
        $userId = Auth::id();
        //Todo: реализовать поиск чатов между 2 пользователями, и не создавать повторы
        $thread = Dialog\Thread::create([
            'subject' => $input['subject'],
            'user_id' => $userId,
        ]);

        // Message
        if ($input['message']) {
            Dialog\Message::create([
                'thread_id' => $thread->id,
                'user_id' => $userId,
                'body' => $input['message'],
            ]);
        }

        // Sender
        Dialog\Participant::create([
            'thread_id' => $thread->id,
            'user_id' => $userId,
            'last_read' => new Carbon,
        ]);

        // Recipients
        if (Input::has('recipients')) {
            $thread->addParticipant($input['recipients']);
        }
        $res = $this->show($thread->id);
        broadcast(new ChatCreated($res))->toOthers();
        return $res;

    }

    /**
     * Adds a new message to a current thread.
     *
     * @return mixed
     * @throws Exception
     */
    public function update()
    {
        try {
            $thread = Dialog\Thread::findOrFail(Input::get('id'));
        } catch (ModelNotFoundException $e) {

            return 'The thread with ID: ' . Input::get('id') . ' was not found. '.$e;
        }

        $thread->activateAllParticipants();

        // Message
        Dialog\Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => Input::get('message'),
        ]);

        // Add replier as a participant
        $participant = Dialog\Participant::firstOrCreate([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
        ]);
        $participant->last_read = new Carbon;
        $participant->save();

        // Recipients
        if (Input::has('recipients')) {
            $thread->addParticipant(Input::get('recipients'));
        }
        $res = $this->show(Input::get('id'));
        broadcast(new Chats($res));
        return ['error'=>'false', 'update'=>$res];
    }

    /**
     * Remove a user from the chat.
     *
     * @return mixed
     * @throws Exception
     */
    public function deleteChat() {
        $del_id = Input::get('idChat');

        try {
            $chat = Dialog\Thread::findOrFail($del_id);
            $chat->removeParticipant(Input::get('idUser'));
        } catch (ModelNotFoundException $e) {
            return 'The thread with ID: ' . $del_id . ' was not found. '.$e;
        }

        broadcast(new ChatRemoved($del_id))->toOthers();
        return ['error'=>'false', 'delete_id'=>$del_id];
    }
}
