<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return  $user
     */
    public function store(Request $request)
    {

        $search = User::where('name', $request->name)->first();
        if ($search) {
            return [
                $search,
                'message' => [
                    'type' => 'info',
                    'text' => "Такой пользователь существует!"
                ]
            ];
        }
        $user = User::create($request->all());
        return [
            $user,
            'message' => [
                'type' => 'success',
                'text' => 'Пользователь создан!'
            ]
        ];
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
