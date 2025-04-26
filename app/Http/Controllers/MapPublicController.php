<?php

namespace App\Http\Controllers;

use App\Models\Fasum;
use App\Models\Jenis;
use App\Models\Notif;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DataTables;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class MapPublicController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->data['title'] = env('APP_NAME');

    }

    public function getFasumAll()
    {
        $data = Fasum::with('jenisTempat') // biar langsung eager load relasinya
            ->orderBy('id')
            ->get()
            ->each(function ($row) {
                $row->latitude = $row->lat;
                $row->longitude = $row->long;
                $row->jenis = $row->jenisTempat->jenis ?? 'Undefined'; // handle kalo relasinya null
            });

        return response()->json($data);
    }
}
