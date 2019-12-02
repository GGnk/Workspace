<?php

namespace App\Http\Controllers;

use App\Events\TaskCreated;
use App\Events\TaskRemoved;
use App\Events\TaskUpdated;
use App\Models\Dep;
use App\Models\Task;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TaskController extends Controller
{
    public function index(User $user, Dep $dep)
    {
        $with_date_tasks = Carbon::now()->subMonth(2);
        $tasks = $user->where('role_id', 1)->with(['tasks' => function($qwery) use ($with_date_tasks) {
            $qwery->whereMonth('created_at','>=', $with_date_tasks)
                ->whereGeneral(0)
                ->latest();
        }])->get();
        $general_tasks = $dep->whereHas('tasks')->with(['tasks' => function($qwery) use ($with_date_tasks) {
            $qwery->whereMonth('created_at','>=', $with_date_tasks)
                ->whereCompleted(0)
                ->whereGeneral(1)
                ->with('author')
                ->latest();
        }])->get();
        $deps = $dep->select('id','name')->get();
        return compact('tasks', 'with_date_tasks', 'general_tasks', 'deps');
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
//        broadcast(new TaskCreated($task));
        return $task;
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
        $task = Task::with('users')->findOrFail($request->task['id']);
        $task->update($request->task);
//        broadcast(new TaskUpdated($task));
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
//        broadcast(new TaskRemoved($task));
        $task->delete();
        return 'Задача удалена';
    }
}
