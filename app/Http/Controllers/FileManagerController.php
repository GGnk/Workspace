<?php

namespace App\Http\Controllers;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileManagerController extends Controller
{

    protected $disk;
    protected $request;

    public function __construct(Request $request)
    {
        $this->disk = Storage::disk('obmen');
        $this->request = $request;
    }

    /** Returns array folders and files
     * @return array
     */
    function index() {
        $dir = '';
        if ($this->request->has('dir')) $dir = $this->request->dir;

           $dirs = $this->disk->directories($dir);

           $fly = new Filesystem();

           foreach ($dirs as $dirl) {

               $cc = collect()->put("dirname", dirname($dirl,1));
               $cc->put("folder", $this->RUbasename($dirl));

               $cc->put("path",$dirl);

               $arr[] = $cc;
               $dirs = $arr;
           }

            $files = $this->disk->files($dir);

            foreach ($files as $file) {

                $ccf = collect()->put("dirname", dirname($file,1));
                $ccf->put("name",$this->RUbasename($file));
                $ccf->put("path", $file);
                $ccf->put("ext", $fly->extension($file));
                $ccf->put("size",'');
                $arrf[] = $ccf;
                $files = $arrf;
            }



        return compact('dirs', 'files');
    }

    public function getSize() {
        return round($this->disk->size($this->request->dir)/1048576,3);
    }

    /** Returns filename component of path (with space)
     * @param $path
     * @return mixed|string
     */
    function RUbasename($path) {
        return ltrim(substr($path, strrpos($path, DIRECTORY_SEPARATOR) ), DIRECTORY_SEPARATOR);
    }
}
