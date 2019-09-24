<?php

namespace App\Http\Controllers;

use App\Models\Dep;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DepController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Dep[]|Builder[]|Collection
     */
    public function index()
    {
        return Dep::with('tasks')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return void
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param Dep $dep
     * @return void
     */
    public function show(Dep $dep)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Dep $dep
     * @return void
     */
    public function edit(Dep $dep)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Dep $dep
     * @return void
     */
    public function update(Request $request, Dep $dep)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Dep $dep
     * @return void
     */
    public function destroy(Dep $dep)
    {
        //
    }
}
