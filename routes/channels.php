<?php
use Cmgmyr\Messenger\Models\Thread;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('Chat_created', function(){
    return true;
});
Broadcast::channel('chat.{thread_id}', function($user, $thread_id){
    /*$thread = Thread::findOrFail($thread_id);
    return $thread->hasParticipant($user.id);*/
    return true;
});
Broadcast::channel('Chat_removed', function(Thread $thread){
    return true;
});

Broadcast::channel('newTask', function(){
    return true;
});
Broadcast::channel('taskUpdated', function(){
    return true;
});
Broadcast::channel('taskRemoved', function(){
    return true;
});
