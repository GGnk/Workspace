<?php


Route::get('/', function () {
    return redirect()->route('dialog.index');
});
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::get('logout', 'Auth\LoginController@logout')->name('auth.logout');

Route::get('/admin', ['uses' => 'HomeController@index', 'as' => 'index']);
Route::get('/searchInfo', ['uses' => 'HomeController@searchInfo', 'as' => 'searchInfo']);
Route::get('/getInfo', ['uses' => 'HomeController@getInfo', 'as' => 'getInfo']);


Route::post('/obmen', ['uses' => 'FileManagerController@index', 'as' => 'index']);

Route::group(['middleware' =>  ['auth'],'prefix' => 'dialog', 'as' => 'dialog.'], function () {
    Route::get('/', ['uses' => 'DialogController@index', 'as' => 'index']);
    Route::post('all', [ 'uses' => 'DialogController@fetchAll','as' => 'all']);
    Route::post('store', ['uses' => 'DialogController@store','as' => 'store']);
    Route::post('show', ['uses' => 'DialogController@show','as' => 'show']);
    Route::post('update', ['uses' => 'DialogController@update','as' => 'update']);
    Route::post('delete', ['uses' => 'DialogController@deleteChat','as' => 'delete']);

    Route::resource('deps', 'DepController', [
        'except' => ['create', 'edit', 'show']
    ]);
    Route::resource('tasks', 'TaskController', [
        'except' => ['create', 'edit', 'show']
    ]);
});

Auth::routes();


