<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileManagerController extends Controller
{
    public function index() {

           $obmen = Storage::disk('obmen')->directories();
            $files =  Storage::disk('obmen')->files();
           foreach($files as $file) {
                $obmen[] = $file;
           };


        return $obmen;
    }
}
