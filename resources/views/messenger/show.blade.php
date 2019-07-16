@if(isset($thread))
    <div class="title"><b>{{ $thread->subject }}</b><i class="fa fa-search"></i></div>
    <div class="chat-list">
        <ul style="width: 100%;">

                @each('messenger.partials.messages', $thread->messages, 'message')

        </ul>
    </div>
    @include('messenger.partials.form-message')
@endif
