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
                <li><a href="/">Главная @include('messenger.unread-count')</a></li>
                <li>
                    <a href="#" role="button" data-toggle="modal" data-target="#createChat">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        <span>Создать чат!</span>
                    </a>
                    <!-- Modal -->
                    @include('messenger.create')
                </li>
            </ul>
        </div>
    </div>
    <div class="window-area row">
        <div class="conversation-list col-12 col-sm-3" style="padding: 0">
            <ul style="margin-bottom: 46px;">

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
        <div class="right-tabs col-12 col-sm-3 col" id="accordion">
            <ul class="tabs">
                <li>
                    <a data-toggle="collapse" href="#Collapse1" role="button" aria-expanded="true" aria-controls="Collapse1"><i class="fa fa-users"></i></a>
                </li>
                <li class="active"><a data-toggle="collapse" href="#Collapse2" role="button" aria-expanded="false" aria-controls="Collapse2"><i class="fa fa-paperclip"></i></a></li>
                <li><a data-toggle="collapse" href="#Collapse3" role="button" aria-expanded="false" aria-controls="Collapse3"><i class="fa fa-link"></i></a></li>
            </ul>
            <div class="col collapse show" id="Collapse1" data-parent="#accordion">
                <ul class="tabs-container">
                    <li class="active">
                        <ul class="member-list">
                            @foreach($users as $user)
                            <li class="btn-outline-light" style="cursor: pointer">
                                <span class="status idle">
                                    <i class="fa fa-circle-o"></i>
                                </span>
                                <span id="dropdownMenuButton{{$user->id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span style="color: black;">{{$user->name}}</span>
                                </span>
                                <span class="time">10:45 pm</span>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton{{$user->id}}">
                                    <a class="dropdown-item" href="#"  style="color: black">Написать</a>
                                </div>
                            </li>
                            @endforeach
                        </ul>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div class="col collapse"  id="Collapse2" data-parent="#accordion">
                Two
            </div>
            <div class="col collapse"  id="Collapse3" data-parent="#accordion">
                Three
            </div>
            <i class="fa fa-cog"></i>
        </div>
</div>


@stop
