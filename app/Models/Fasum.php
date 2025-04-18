<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fasum extends Model
{
    use HasFactory;
    protected $table = 'fasilitas_umum';
    protected $primaryKey = 'id';
    protected $fillable = ['nama','alamat','lat','long','foto','deskripsi'];
    protected $inputType = [
        'nama' => 'text',
        'alamat' => 'text',
        'lat' => 'text',
        'long' => 'text',
        'foto' => 'file',
        'deskripsi' => 'textearea',
    ];

    public function getField()
    {
        return $this->inputType;
    }
}
