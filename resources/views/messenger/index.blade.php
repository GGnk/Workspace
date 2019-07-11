@extends('layouts.master')

@section('content')
    @include('messenger.partials.flash')

    <div class="window-wrapper">
    <div class="window-title">
        <div class="dots">
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle"></i>
        </div>
        <div class="title">
            <ul class="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/messages">Messages @include('messenger.unread-count')</a></li>
                <li><a href="/messages/create">Create New Message</a></li>
            </ul>
        </div>
    </div>
    <div class="window-area">
        <div class="conversation-list">
            <ul class="">
                <li class="item"><a href="#"><i class="fa fa-list-alt"></i><span>Учасники</span></a></li>
                <li class="item active"><a href="#"><i class="fa fa-user"></i><span>Команда чата</span><i class="fa fa-times"></i></a></li>
                <li><a href="#"><i class="fa fa-circle-o online"></i></i><span>Кристина Галеева</span><i class="fa fa-times"></i></a></li>
                <li><a href="#"><i class="fa fa-circle-o idle"></i></i><span>Давид Барто</span><i class="fa fa-times"></i></a></li>
                <li><a href="#"><i class="fa fa-circle-o offline"></i></i><span>Сергей Бондарь</span><i class="fa fa-times"></i></a></li>
                <li><a href="#"><i class="fa fa-circle-o offline"></i></i><span>Глеб Кавраский</span><i class="fa fa-times"></i></a></li>
            </ul>
            <div class="my-account">
                <div class="image">
                    <img src="images/de76e03aa6b5b0bf675c1e8a990da52f.jpg">
                    <i class="fa fa-circle online"></i>
                </div>
                <div class="name">
                    <span>Кристина Галеева</span>
                    <i class="fa fa-angle-down"></i>
                    <span class="availability">В сети</span>
                </div>

            </div>
        </div>
        <div class="chat-area">
            <div class="title"><b>Переписка</b><i class="fa fa-search"></i></div>
            <div class="chat-list">
                <ul style="width: 100%;">
                    <li class="me">
                        <div class="name">
                            <span class="">Kristi Galeeva</span>
                        </div>
                        <div class="message">
                            <p>Hey, do you like the new interface? It's done with Font Awesome.</p>
                            <span class="msg-time">5:00 pm</span>
                        </div>
                    </li>
                    <li class="">
                        <div class="name">
                            <span class="">David Barto</span>
                        </div>
                        <div class="message">
                            <p><span class="blue-label">Kristi Galeeva</span> I see what you did there.</p>
                            <span class="msg-time">5:01 pm</span>
                        </div>
                    </li>
                    <li class="me">
                        <div class="name">
                            <span class="">Kristi Galeeva</span>
                        </div>
                        <div class="message">
                            <p>Feel free to look at the code if you want.</p>
                            <span class="msg-time">5:02 pm</span>
                        </div>
                    </li>
                    <li class="">
                        <div class="name">
                            <span class="">Gleb Kavrasky</span>
                        </div>
                        <div class="message">
                            <p>Yeah, will do.</p>
                            <span class="msg-time">5:04 pm</span>
                        </div>
                    </li>
                    <li class="me">
                        <div class="name">
                            <span class="">Kristi Galeeva</span>
                        </div>
                        <div class="message">
                            <p>This is an example text reply.</p>
                            <span class="msg-time">5:04 pm</span>
                        </div>
                    </li>
                    <li class="">
                        <div class="name">
                            <span class="">Christian Smith</span>
                        </div>
                        <div class="message">
                            <p>I know, put some more.</p>
                            <span class="msg-time">5:06 pm</span>
                        </div>
                    </li>
                    <li class="me">
                        <div class="name">
                            <span class="">Kristi Galeeva</span>
                        </div>
                        <div class="message">
                            <p>Here is another line.</p>
                            <span class="msg-time">5:06 pm</span>
                        </div>
                    </li>
                    <li class="">
                        <div class="name">
                            <span class="">Gleb Kavrasky</span>
                        </div>
                        <div class="message">
                            <p>Yeah, will do.</p>
                            <span class="msg-time">5:04 pm</span>
                        </div>
                    </li>
                    <li class="me">
                        <div class="name">
                            <span class="">Kristi Galeeva</span>
                        </div>
                        <div class="message">
                            <p>Feel free to look at the code if you want.</p>
                            <span class="msg-time">5:02 pm</span>
                        </div>
                    </li>
                    <li class="">
                        <div class="name">
                            <span class="">David Barto</span>
                        </div>
                        <div class="message">
                            <p>Yeah, will do.</p>
                            <span class="msg-time">5:04 pm</span>
                        </div>
                    </li>
                    <li class="me">
                        <div class="name">
                            <span class="">Kristi Galeeva</span>
                        </div>
                        <div class="message">
                            <p>Feel free to look at the code if you want.</p>
                            <span class="msg-time">5:02 pm</span>
                        </div>
                    </li>
                    <li class="">
                        <div class="name">
                            <span class="">Sergey Bondar</span>
                        </div>
                        <div class="message">
                            <p>Yeah, will do.</p>
                            <span class="msg-time">5:04 pm</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="input-area">
                <div class="input-wrapper">
                    <input type="text" value="">
                    <i class="fa fa-smile-o"></i>
                    <i class="fa fa-paperclip"></i>
                </div>
                <input type="button" value="Ввод" class="send-btn">
            </div>
        </div>
        <div class="right-tabs">
            <ul class="tabs">
                <li class="active">
                    <a href="#"><i class="fa fa-users"></i></a>
                </li>
                <li><a href="#"><i class="fa fa-paperclip"></i></a></li>
                <li><a href="#"><i class="fa fa-link"></i></a></li>
            </ul>
            <ul class="tabs-container">
                <li class="active">
                    <ul class="member-list">
                        <li><span class="status online"><i class="fa fa-circle-o"></i></span><span>Kristi Galeeva</span></li>
                        <li><span class="status online"><i class="fa fa-circle-o"></i></span><span>Segey Bondar</span></li>
                        <li><span class="status idle"><i class="fa fa-circle-o"></i></span><span>Gleb Kavrasky</span><span class="time">10:45 pm</span></li>
                        <li><span class="status offline"><i class="fa fa-circle-o"></i></span><span>David Barto</span></li>
                    </ul>
                </li>
                <li></li>
                <li></li>
            </ul>
            <i class="fa fa-cog"></i>
        </div>
    </div>
</div>

    <!-- @each('messenger.partials.thread', $threads, 'thread', 'messenger.partials.no-threads')-->
@stop
