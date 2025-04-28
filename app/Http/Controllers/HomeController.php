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
        return view('map', $this->data);
    }

    public function login()
    {
        $this->data['alertMessage'] = '';
        return view('auth/login', $this->data);
    }

    //GeT FUnction
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

    public function getJenis()
    {
        $data = Jenis::select('*')
                ->orderby('jenis', 'ASC')
                ->get();

        return response()->json($data);
    }

    public function countTempatPerJenis()
    {
        $tempat = Fasum::with('jenisTempat')->get();

        $counts = $tempat->groupBy(function ($item) {
            return $item->jenisTempat->jenis ?? 'Undefined';
        })->map(function ($group) {
            return $group->count();
        });

        return response()->json($counts);
    }

    public function getFasumWithPaginate(Request $request)
    {
        $search = $request->query('search');
        $page = $request->query('page', 1);

        $query = Fasum::with('jenisTempat');

        if ($search) {
            $query->where('nama', 'like', "%$search%");
        }

        $data = $query->paginate(8); // load 8 per page

        $data->getCollection()->transform(function ($fasum) {
            return [
                'id' => $fasum->id,
                'nama' => $fasum->nama,
                'alamat' => $fasum->alamat,
                'cover_image' => $fasum->cover_image,
                'latitude' => $fasum->lat,
                'longitude' => $fasum->long,
                'markerIcon' => '../../assets/static/' . $fasum->jenisTempat->icon,
                'jenis' => $fasum->jenisTempat->jenis ?? 'Undefined'

            ];
        });

        return response()->json($data);
    }
}
