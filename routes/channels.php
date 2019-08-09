<?php

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
Broadcast::channel('Chats', function(){
     return true;
});
Broadcast::channel('Chat_removed', function(){
    return true;
});
