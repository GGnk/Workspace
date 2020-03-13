<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Repositories\UserRepositoryInterface;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    protected $users;

    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }
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
     * @param File $file
     * @return array $user
     */
    public function store(Request $request, File $file)
    {
        if (!Gate::allows('admins')) {
            return [
                'message' => [
                    'type' => 'error',
                    'text' => 'Вы не можите создавать пользователей! Хакер что-ли)'
                ]
            ];
        }
        $this->validate($request, [
            'name' => 'required',
            'phone' => 'required',
            'profession' =>'required|string',
            'img' => 'file|mimes:' . File::getAllExtensions() . '|max:' . File::getMaxSize()
        ]);
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

        $user = $this->users->create($request->all('name', 'email', 'phone', 'profession', 'sort'));

        $files = $request->allFiles();
        $data = $file->uploadFiles($files, 'avatars/'.$user->id, 'created');
        $path = collect()->put('img', $data['path_img']);
        $path->put('files', $data['path_files']);

        $user = $this->users->update($user->id, $path->toArray(), true);

        return [
            'user' => $user->refresh(),
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
     * @param File $file
     * @return array
     */
    public function update(Request $request, File $file)
    {
        $this->validate($request, [
            'name' => 'required',
            'phone' => 'required',
            'profession' =>'required|string',
            'new_img' => 'file|mimes:' . File::getAllExtensions() . '|max:' . File::getMaxSize()
        ]);

        try {
            $contact = $this->users->get($request->id);
            if (!Gate::allows('update_user', $contact)){
                return [
                    'message' => [
                        'type' => 'error',
                        'text' => 'У Вас нет доступа!'
                    ]
                ];
            }
        } catch (ModelNotFoundException $e) {
            return [
                'message' => [
                    'type' => 'info',
                    'text' => 'Контакт в базе не найден!'
                ]
            ];
        }
        $files = $request->allFiles();
        $link ='avatars/'.$contact->id;
        $path = $file->uploadFiles($files, $link, 'updated', 'new_img');

        $data = $request->all('name', 'email', 'phone', 'profession', 'sort');
        $this->users->update($contact->id, $data);

        $data_file = collect();
        if (isset($path['path_img'])) {
            $data_file->put('img', $path['path_img']);
        }
        if (count($path['path_files']) > 0) $data_file->put('files', $path['path_files']);

        if ($data_file->isNotEmpty()) $user = $this->users->update($contact->id, $data_file->toArray(), true);

        return [
            'user' => $user ?? $this->users,
            'message' => [
                'type' => 'success',
                'text' => 'Данные о контакте обновлены!'
            ]
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        $del_user = $this->users->get($id);
        if (!Gate::allows('del_user', $del_user)){
            return [
                'message' => [
                    'type' => 'error',
                    'text' => 'У Вас нет доступа!'
                ]
            ];
        }

        $this->users->delete($id);
        return [
            'message' => [
                'type' => 'success',
                'text' => 'Контакт удален!'
            ]
        ];
    }
}
