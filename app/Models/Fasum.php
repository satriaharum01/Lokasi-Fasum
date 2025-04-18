<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Fasum extends Model
{
    use HasFactory;
    protected $table = 'fasilitas_umum';
    protected $primaryKey = 'id';
    protected $fillable = ['nama','alamat','lat','long','cover_image','deskripsi'];
    protected $inputType = [
        'nama' => 'text',
        'alamat' => 'text',
        'lat' => 'text',
        'long' => 'text',
        'cover_image' => 'file',
        'deskripsi' => 'textearea',
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'nama'         => 'required|string|max:255',
            'alamat'       => 'required|string|max:255',
            'lat'          => 'required|numeric|between:-90,90',
            'long'         => 'required|numeric|between:-180,180',
            'deskripsi'    => 'required|string'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }
}
