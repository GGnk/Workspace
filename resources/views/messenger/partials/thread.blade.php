<?php $class = $thread->isUnread(Auth::id()) ? '' : 'display: none;'; ?>
<!--
Тема: {{ $thread->subject }}
Тело сообщения: {{ $thread->latestMessage->body }}
Участники:{{ $thread->participantsString(Auth::id()) }}
-->

<!-- <li class="item"><a href="#"><i class="fa fa-list-alt"></i><span>Учасники</span></a></li>
     <li class="item active"><a href="#"><i class="fa fa-user"></i><span>Команда чата</span><i class="fa fa-times"></i></a></li>
     <li><a href="#"><i class="fa fa-circle-o offline"></i></i><span>Сергей Бондарь</span><i class="fa fa-times"></i></a></li>
-->
<li >
    <a href="{{ route('messages.show', $thread->id) }}">
        <i class="fa fa-circle-o online"></i></i>
        <span style="width: 70%;">{{ $thread->creator()->name }}</span><span class="label label-danger" style="{{ $class }}">{{ $thread->userUnreadMessagesCount(Auth::id()) }}</span>
    </a>
</li>
