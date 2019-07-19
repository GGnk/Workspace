<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return redirect()->route('messages.index');
});
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::get('logout', 'Auth\LoginController@logout')->name('auth.logout');

Route::group(['middleware' => ['auth'],'prefix' => 'messages', 'as' => 'messages.'], function () {
    Route::get('/', ['uses' => 'MessagesController@index', 'as' => 'index']);
    Route::get('create', [ 'uses' => 'MessagesController@create','as' => 'create']);
    Route::post('/', ['uses' => 'MessagesController@store','as' => 'store']);
    Route::get('{id}', ['uses' => 'MessagesController@show','as' => 'show']);
    Route::put('{id}', ['uses' => 'MessagesController@update','as' => 'update']);
});
Route::group(['middleware' => ['auth'],'prefix' => 'dialog', 'as' => 'dialog.'], function () {
    Route::get('/', ['uses' => 'DialogController@index', 'as' => 'index']);
    Route::get('create', [ 'uses' => 'DialogController@create','as' => 'create']);
    Route::post('/', ['uses' => 'DialogController@store','as' => 'store']);
    Route::post('show', ['uses' => 'DialogController@show','as' => 'show']);
    Route::put('{id}', ['uses' => 'DialogController@update','as' => 'update']);
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
