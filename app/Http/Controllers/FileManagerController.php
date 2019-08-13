<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileManagerController extends Controller
{
    /**
     * @param Request $request
     * @return array
     */
    public function index(Request $request) {
        $dir = '';
        if ($request->has('dir')) $dir = $request->dir;

           $disk = Storage::disk('obmen');

           $dirs = $disk->directories($dir);
           $files = $disk->files($dir);


        return compact('dirs', 'files');
    }
}
