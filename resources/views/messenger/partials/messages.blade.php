<li class="{{$message->user->id == Auth::user()->id ? 'me':''}}">
    <div class="name">
            <img src="{{ $message->user->img }}">
    </div>
    <div class="message">
        <span class="badge">{{ $message->user->id == Auth::user()->id ? 'You': $message->user->name }}</span>
        <p>{{ $message->body }}</p>
        <span class="msg-time">{{ $message->created_at->diffForHumans() }}</span>
    </div>
</li>
