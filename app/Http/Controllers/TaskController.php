<?php

namespace App\Http\Controllers;

use App\Events\TaskCreated;
use App\Events\TaskRemoved;
use App\Events\TaskUpdated;
use App\Models\Task;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    public function index()
    {
        $task = User::with(['tasks' => function($qwery){
            $qwery->where('completed', false);
        }])->get();
        return $task;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Task|Task[]|Builder|Builder[]|Collection|Model
     */
    public function store(Request $request)
    {
        $newTask = Task::create($request->all() + ['users_id' => $request->user, 'user_create' => $request->user]);
        $task = Task::with('users')->find($newTask->id);
        broadcast(new TaskCreated($task));
        return $task;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Task|Task[]|Builder|Builder[]|Collection|Model
     */
    public function update(Request $request, $id)
    {
        $task = Task::with('users')->findOrFail($id);
        $task->update($request->all());
        broadcast(new TaskUpdated($task));
        return $task;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return string
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        broadcast(new TaskRemoved($task));
        $task->delete();
        return 'Задача удалена';
    }
}
