<?php

namespace App\Http\Controllers;

use App\Models\Fasum;
use App\Models\Notif;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DataTables;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class HomeController extends Controller
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

    /*
     * Dashboad Function
    */
    public function index()
    {
        return redirect()->to(route('login'));
        return view('landing/index', $this->data);
    }

    public function login()
    {
        $this->data['alertMessage'] = '';
        return view('auth/login', $this->data);
    }

    //GeT FUnction
    public function getBarang()
    {
        $data = Barang::select('*')
                ->orderby('nama_barang', 'ASC')
                ->get();

        return Datatables::of($data)
            ->addIndexColumn()
            ->make(true);
    }

    public function getUsersLevel($level)
    {
        if ($level == 'all') {
            $level = '';
        }

        $data = User::select('*')
                ->where('level', $level)
                ->orderby('name', 'ASC')
                ->get();

        return Datatables::of($data)
            ->addIndexColumn()
            ->make(true);
    }

    public function getTahunUnik()
    {
        $years = Pengadaan::selectRaw('YEAR(tanggal) as year')
            ->distinct()
            ->orderBy('year', 'asc')
            ->pluck('year')
            ->toArray();

        return response()->json($years);
    }

}
