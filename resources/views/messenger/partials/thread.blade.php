<?php
$class = $thread->isUnread(Auth::id()) ? '' : 'display: none;';
$messages = $thread->messages()->with('user')->latest('created_at')->take(1)->get();
$count = count($thread->participantsUserIds());
?>
@inject('request', 'Illuminate\Http\Request')

<li xmlns="http://www.w3.org/1999/html" style="{{ $request->segment(2) == $thread->id ? 'background: #445166;' : '' }}">
    <a href="{{ route('messages.show', $thread->id) }}">
        <span style="width: 70%;color: white;    font-size: 13px;">
            <i class="fa {{$count>2?'fa-users':'fa-comments-o'}}" style="color: white" aria-hidden="true"></i>
            {{$count>2? $thread->subject : $thread->participantsString(Auth::id()) }}
        </span>
        </br>
        <span style=" margin: 5px;overflow: hidden;text-overflow: ellipsis;height: 13px;    width: 90%;">
            @foreach($messages as $mess)
            <h4 class="badge">{{$mess->user->id === Auth::id() ? 'Вы': $mess->user->name}}:</h4> {{$mess->body}}
            @endforeach

        </span>
        <span class="label label-danger" style="{{ $class }} float: right;">{{ $thread->userUnreadMessagesCount(Auth::id()) }}</span>
    </a>
</li>
