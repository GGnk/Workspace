<?php

namespace App;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Thread;

class Dialog extends Thread
{
    public function getMessageUser()
    {
        return $this->messages()->with('user')->get();
    }
}
