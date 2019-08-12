<?php


Route::get('/', function () {
    return redirect()->route('dialog.index');
});
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::get('logout', 'Auth\LoginController@logout')->name('auth.logout');

/*Route::group(['middleware' => ['auth'],'prefix' => 'messages', 'as' => 'messages.'], function () {
    Route::get('/', ['uses' => 'MessagesController@index', 'as' => 'index']);
    Route::get('create', [ 'uses' => 'MessagesController@create','as' => 'create']);
    Route::post('/', ['uses' => 'MessagesController@store','as' => 'store']);
    Route::get('{id}', ['uses' => 'MessagesController@show','as' => 'show']);
    Route::put('{id}', ['uses' => 'MessagesController@update','as' => 'update']);
});*/
Route::get('/obmen', ['uses' => 'FileManagerController@index', 'as' => 'index']);

Route::group(['middleware' => ['auth'],'prefix' => 'dialog', 'as' => 'dialog.'], function () {
    Route::get('/', ['uses' => 'DialogController@index', 'as' => 'index']);
    Route::post('all', [ 'uses' => 'DialogController@fetchAll','as' => 'all']);
    Route::post('/store', ['uses' => 'DialogController@store','as' => 'store']);
    Route::post('show', ['uses' => 'DialogController@show','as' => 'show']);
    Route::post('/update', ['uses' => 'DialogController@update','as' => 'update']);
    Route::post('/delete', ['uses' => 'DialogController@deleteChat','as' => 'delete']);
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
