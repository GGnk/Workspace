<?php
$users = \App\User::where('id','!=',Auth::id())->get();
?>
<div class="modal" id="createChat" tabindex="-1" role="dialog" aria-labelledby="createChatTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createChatTitle">Создать чат</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="{{ route('messages.store') }}" method="POST">
                    {{ csrf_field() }}
                    <div class="col-md-12">
                        <!-- Subject Form Input -->
                        <div class="form-group row">
                            <div class="col-sm-6 col-12">
                                @if($users->count() > 0)
                                <label for="people" class="control-label">Кому</label>
                                <select multiple name="recipients[]" class="form-control" id="people">
                                    @foreach($users as $user)
                                    <option value="{{ $user->id }}">{!!$user->name!!}</option>
                                    @endforeach
                                </select>
                                @endif
                            </div>
                            <div class="col-sm-6 col-12">
                                <label for="Subject" class="control-label">Тема</label>
                                <input type="text" id="Subject" class="form-control" name="subject" placeholder="Тема"
                                       value="{{ old('subject') ? old('subject'): 'Сообщение' }}">
                            </div>
                        </div>

                        <!-- Message Form Input -->
                        <div class="form-group row">
                            <label for="message" class="control-label">Сообщение</label>
                            <textarea name="message" id="message" class="form-control">{{ old('message') }}</textarea>
                        </div>



                        <!-- Submit Form Input -->
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary form-control">Отправить</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

