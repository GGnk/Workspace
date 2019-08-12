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
    return auth()->check();
});
Broadcast::channel('Chats', function(){
     return auth()->check();
});
Broadcast::channel('Chat_removed', function(Thread $thread){
    return $thread->hasParticipant(auth()->id());
});
