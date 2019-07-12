<form action="{{ route('messages.update', $thread->id) }}" method="post">
    {{ method_field('put') }}
    {{ csrf_field() }}
    <div class="input-area">
        <div class="input-wrapper col-9">
            <input name="message" type="text" value="{{ old('message') }}">
            <i class="fa fa-smile-o"></i>
            <i class="fa fa-paperclip"></i>
        </div>
        <button type="submit" class="btn btn-primary send-btn col-3" style="height: 32px;font-size: 12px;padding: 2px;" >Отправить</button>

        <!--@if($users->count() > 0)
        <div class="checkbox">
            <h4><b>Добавить в беседу:</b></h4>
            @foreach($users as $user)
            <label>
                <input type="checkbox" name="recipients[]" value="{{ $user->id }}" style="display: none">
                <span class="lbchecked badge">{{ $user->name }}</span>
            </label>
            @endforeach
        </div>
        @endif-->
    </div>
</form>

