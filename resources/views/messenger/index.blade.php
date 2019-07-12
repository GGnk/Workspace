@extends('layouts.master')

@section('content')
    @include('messenger.partials.flash')

    <div class="window-title">
        <div class="dots">
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle"></i>
        </div>
        <div class="title">
            <ul class="nav navbar-nav">
                <li><a href="/">Главная</a></li>
                <li><a href="#">Чаты @include('messenger.unread-count')</a></li>
            </ul>
        </div>
    </div>
    <div class="window-area row">
        <div class="conversation-list col-12 col-sm-3">
            <ul class="">
                <li >
                    <a href="/messages/create">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        <span style="width: 70%;">Создать чат!</span>
                    </a>
                </li>
                @each('messenger.partials.thread', $threads, 'thread', 'messenger.partials.no-threads')
            </ul>
            <div class="my-account">
                <div class="image">
                    <img src="{{Auth::user()->img}}">
                    <i class="fa fa-circle online"></i>
                </div>
                <div class="name">
                    <div class="dropdown">
                        <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>{{Auth::user()->name}}</span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="/logout"  style="color: black">Выход</a>
                        </div>
                    </div>
                    <span class="availability">В сети</span>
                </div>

            </div>
        </div>
        <div class="chat-area col-12 col-sm-6">
            @include('messenger.show')

        </div>
        <div class="right-tabs col-12 col-sm-3">
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
                        @foreach($users as $user)
                        <li>
                            <span class="status idle">
                                <i class="fa fa-circle-o"></i>
                            </span>
                            <span>{{$user->name}}</span>
                            <span class="time">10:45 pm</span>
                        </li>
                        @endforeach
                    </ul>
                </li>
                <li></li>
                <li></li>
            </ul>
            <i class="fa fa-cog"></i>
        </div>
</div>


@stop
