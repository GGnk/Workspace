<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {

    }

    public static function getCheckAuth()
    {
        return Auth::check();
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
     * @return array
     */
    public function update(Request $request)
    {
        try {
            $contact = User::findOrFail($request->id);
        } catch (ModelNotFoundException $e) {
            return [
                'message' => [
                    'type' => 'info',
                    'text' => 'Контакт в базе не найден!'
                ]
            ];
        }

        $contact->update($request->all());
        return [
            $contact,
            'message' => [
                'type' => 'success',
                'text' => 'Данные о контакте обновлены!'
            ]
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @param int $id
     * @return array
     * @throws Exception
     */
    public function destroy(User $user, $id)
    {
        $user->destroy($id);
        return [
            'message' => [
                'type' => 'success',
                'text' => 'Контакт удален!'
            ]
        ];
    }
}
