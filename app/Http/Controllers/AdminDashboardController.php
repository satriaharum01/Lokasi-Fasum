<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Fasum;
use Yajra\DataTables\Facades\DataTables;
use App\Http\helpers\Formula;
use Auth;

class AdminDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('is_admin');
    }

    public function index()
    {
        $this->data['title'] = 'Dashboard Admin';
        $this->data['chartColor'] = Formula::$chartColor;
        $this->data['chartColor2'] = Formula::$chartColor2;

        return view('admin/dashboard/index', $this->data);
    }

}
