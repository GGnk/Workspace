<?php


Route::get('/', function () {
    return redirect()->route('admin.index');
});
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::get('logout', 'Auth\LoginController@logout')->name('auth.logout');

Route::get('admin', ['uses' => 'HomeController@index', 'as' => 'admin.index']);
Route::get('searchInfo', ['uses' => 'SearchController@searchInfo', 'as' => 'searchInfo']);
Route::get('getInfo', ['uses' => 'SearchController@getInfo', 'as' => 'getInfo']);
Route::post('initial', ['uses' => 'HomeController@InitialBoot', 'as' => 'initial']);
//Route::post('/add-contact', ['uses' => 'UserController@store', 'as' => 'add-contact']);
//Route::post('/add-posts', ['uses' => 'PostsController@store', 'as' => 'add-posts']);

Route::post('/obmen', ['uses' => 'FileManagerController@index', 'as' => 'index']);

Route::group(['middleware' =>  ['auth'],'prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::post('/add-contact', ['uses' => 'UserController@store', 'as' => 'add-contact']);
    Route::post('/add-posts', ['uses' => 'PostsController@store', 'as' => 'add-posts']);
    Route::resource('deps', 'DepController', [
        'except' => ['create', 'edit', 'show']
    ]);
    Route::resource('tasks', 'TaskController', [
        'except' => ['create', 'edit', 'show']
    ]);
});

Auth::routes();


