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

           foreach ($dirs as $dirl) {
               $cc = collect($dirl);
               $cc->put("name", basename($dirl));
               $cc->put("path",$dirl);
               $arr[] = $cc;
               $dirs = $arr;
           }

            foreach ($files as $dirl) {
                $cc = collect($dirl);
                $cc->put("name", basename($dirl));
                $cc->put("path",$dirl);
                $arr[] = $cc;
                $files = $arr;
            }



        return compact('dirs', 'files');
    }
}
