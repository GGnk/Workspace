<?php

namespace App\Models;

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;

class File extends Model
{
    use Searchable;
    use SoftDeletes;

    protected $fillable = ['name','path'];
    protected $hidden = [];

    public function houses()
    {
        return $this->morphedByMany(House::class, 'filelist');
    }

    public function depts()
    {
        return $this->morphedByMany(Dept::class, 'filelist');
    }

    public function posts()
    {
        return $this->morphedByMany(Post::class, 'filelist');
    }


    public function tasks()
    {
        return $this->morphedByMany(Task::class, 'filelist');
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'filelist');
    }

    public static $image_ext = ['jpg', 'jpeg', 'png', 'gif'];
    public static $audio_ext = ['mp3', 'ogg', 'mpga'];
    public static $video_ext = ['mp4', 'mpeg'];
    public static $document_ext = ['doc', 'docx', 'pdf', 'odt'];

    /**
     * Get maximum file size
     * @return int maximum file size in kilobites
     */
    public static function getMaxSize()
    {
        return (int)ini_get('upload_max_filesize') * 1000;
    }

    /**
     * Get all extensions
     * @return string
     */
    public static function getAllExtensions()
    {
        $merged_arr = array_merge(self::$image_ext, self::$audio_ext, self::$video_ext, self::$document_ext);
        return implode(',', $merged_arr);
    }
    /**
     * Get type by extension
     * @param  string $ext Specific extension
     * @return string      Type
     */
    public function getType($ext)
    {
        if (in_array($ext, self::$image_ext)) {
            return 'image';
        }
        if (in_array($ext, self::$audio_ext)) {
            return 'audio';
        }
        if (in_array($ext, self::$video_ext)) {
            return 'video';
        }
        if (in_array($ext, self::$document_ext)) {
            return 'document';
        }
    }

    public function uploadImg($file, $img_path, string $prepend_name = null) {
        $original_ext = $file->getClientOriginalExtension();
        return Storage::putFileAs($img_path, $file, (isset($prepend_name) ? $prepend_name: $file->getClientOriginalName()).'-'.(new Carbon)->format('Y-m-d-H-i').'.'.$original_ext);
    }

    public function uploadFiles(array $files, $img = 'default', string $prepend_name, $old = 'img') {
        $path_img = null;
        $path_files = collect();
        foreach ($files as  $key => $file) {
            if($key == $old) {
                $path_img = $this->uploadImg($file, $img, $prepend_name);
            } else {
                $path_files->push([
                    'name'=> $file->getClientOriginalName(),
                    'path'=> Storage::putFileAs('files', $file, $file->getClientOriginalName())
                ]);
            }
        }
        return compact('path_img', 'path_files');
    }

}
