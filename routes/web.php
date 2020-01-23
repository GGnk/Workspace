<?php
use Illuminate\Support\Facades\DB;

// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('pin', 'Auth\LoginController@pinCode')->name('auth.pinCode');
Route::get('logout', 'Auth\LoginController@logout')->name('auth.logout');

Route::get('/', ['uses' => 'HomeController@index', 'as' => 'index']);
Route::get('searchInfo', ['uses' => 'SearchController@searchInfo', 'as' => 'searchInfo']);
Route::get('search', ['uses' => 'SearchController@search', 'as' => 'search']);
Route::post('initial', ['uses' => 'HomeController@InitialBoot', 'as' => 'initial']);
//Route::post('/add-contact', ['uses' => 'UserController@store', 'as' => 'add-contact']);
//Route::post('/add-posts', ['uses' => 'PostsController@store', 'as' => 'add-posts']);

Route::post('/obmen', ['uses' => 'FileManagerController@index']);

Route::group(['middleware' =>  ['auth'],'prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::post('/add-contact', ['uses' => 'UserController@store', 'as' => 'add-contact']);
    Route::post('/edit-contact', ['uses' => 'UserController@update', 'as' => 'edit-contact']);
    Route::get('/delete-contact/{id}', ['uses' => 'UserController@destroy', 'as' => 'delete-contact']);

    Route::post('/add-posts', ['uses' => 'PostsController@store', 'as' => 'add-posts']);
    Route::resource('deps', 'DepController', [
        'except' => ['create', 'edit', 'show']
    ]);
    Route::get('/tasks', ['uses' => 'TaskController@index', 'as' => 'task.index']);
    Route::post('/tasks', ['uses' => 'TaskController@store', 'as' => 'task.store']);
    Route::put('/tasks/done', ['uses' => 'TaskController@done', 'as' => 'task.done']);
    Route::put('/tasks', ['uses' => 'TaskController@update', 'as' => 'task.update']);
    Route::post('/tasks/rem-relation', ['uses' => 'TaskController@remRelationship', 'as' => 'task.remRelationship']);
    Route::get('/tasks/delete/{id}', ['uses' => 'TaskController@destroy', 'as' => 'task.destroy']);

    Route::get('/posts', ['uses' => 'PostsController@index', 'as' => 'posts.index']);
    Route::post('/posts', ['uses' => 'PostsController@store', 'as' => 'posts.store']);
    Route::get('search-posts', ['uses' => 'SearchController@getPostsSearch', 'as' => 'search-posts']);

});

Auth::routes();


