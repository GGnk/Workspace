<?php

namespace App\Http\Controllers;

use App\Events\TaskCreated;
use App\Events\TaskRemoved;
use App\Events\TaskUpdated;
use App\Models\House;
use App\Models\Task;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(User $user, House $house)
    {
        //$with_date_tasks = Carbon::now()->subMonth(2);
        $tasks = $user->with(['tasks' => function($tt){
            $tt->with(['house' => function($qq) {
                    $qq->select('id', 'name');
                }
            ])->whereCompleted(0)
                ->latest();
        }])->where('roles_id', '<', 3)
            ->select('id', 'name')
            ->get();

        $houses = $house->select('id','name')->get();

        $users = $user->where('roles_id', '<', 3)->select('id','name')->get();

        return compact('tasks',  'houses', 'users');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Model
     */
    public function store(Request $request)
    {
        $newTask = Task::create($request->all() + ['users_id' => Auth::id(), 'user_create' => Auth::id()]);
        $task = Task::with('users')->find($newTask->id);

        $task->house()->attach(array_map(function ($house){ return $house['id']; }, $request->house));

//        broadcast(new TaskCreated($task));
        return $task->find($task->id);
    }
    public function done(Request $request)
    {
        $task = Task::with('users')->findOrFail($request->id);
        $task->update($request->all());
//        broadcast(new TaskUpdated($task));
        return $task;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return Task|Task[]|Builder|Builder[]|Collection|Model
     */
    public function update(Request $request)
    {
        $task = Task::with( ['users','house' => function($qq) {
                $qq->select('id', 'name');
            }
        ])->findOrFail($request->task['id']);
        $task->update($request->task);
        $task->house()->sync(array_map(function ($house){ return $house['id']; }, $request->task['house']));
//        broadcast(new TaskUpdated($task));
        return $task->find($task->id);
    }

    /**
     * Removes a relation!
     *
     * @param Request $request
     * @param Task $task
     * @return string
     */
    public function remRelationship(Request $request, Task $task) {
        try {
            $tt = $task->find($request->task_id);
        } catch (ModelNotFoundException $e){
            return $e;
        }
        $tt->house()->detach($request->relation_id);
        return $task->find($request->task_id);
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
//        broadcast(new TaskRemoved($task));
        $task->house()->detach();
        $task->delete();
        return 'Задача удалена';
    }
}
