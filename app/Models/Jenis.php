<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Jenis extends Model
{
    use HasFactory;
    protected $table = 'jenis';
    protected $primaryKey = 'id';
    protected $fillable = ['jenis'];
    protected $inputType = [
        'jenis' => 'text'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'jenis'         => 'required|string|max:255|min:3'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }
}
