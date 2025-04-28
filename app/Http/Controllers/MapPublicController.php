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
use App\Http\Helpers\TravelTimeEstimator;

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
                $row->markerIcon = '../../assets/static/' . $row->jenisTempat->icon;
                $row->jenis = $row->jenisTempat->jenis ?? 'Undefined'; // handle kalo relasinya null
            });

        return response()->json($data);
    }

    public function calculateTravelTime()
    {
        $startLat = -6.200000; // Contoh: Jakarta
        $startLng = 106.816666;
        $endLat = -6.300000; // Contoh: ke arah selatan Jakarta
        $endLng = 106.816666;

        $travelTimeEstimator = new TravelTimeEstimator();
        $result = $travelTimeEstimator->estimateMotorTravelTime($startLat, $startLng, $endLat, $endLng);
        $estimatedTime = $result['estimated_time_minutes'];
        $distanceKm = $result['distance_km'];

        if ($distanceKm < 1) {
            $distanceKm = '< 1 Km';
        } elseif ($distanceKm > 1) {
            $distanceKm = round($distanceKm, 1) . ' Km';
        } else {
            $distanceKm = round($distanceKm, 0).' Km';
        }

        if ($estimatedTime < 1) {
            $estimatedTime = '< 1 Menit';
        } elseif ($estimatedTime > 59) {
            $estimatedTime = round($estimatedTime / 60, 1) . ' Jam';
        } else {
            $estimatedTime = round($estimatedTime, 0).' Menit';
        }

        return response()->json([
            'distance_km' => $distanceKm,
            'estimated_time_minutes' => $estimatedTime
        ]);
    }
}
