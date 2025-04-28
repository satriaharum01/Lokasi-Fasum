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

    public function calculateTravelTime(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'start_lat' => 'required|numeric',
            'start_lng' => 'required|numeric'
        ]);

        // Ambil inputan dari URL query
        $startLat = $request->start_lat;
        $startLng = $request->start_lng;
        $endLats = $request->end_lat; // array
        $endLngs = $request->end_lng; // array

        $travelTimeEstimator = new TravelTimeEstimator();
        $results = [];

        foreach ($endLats as $index => $endLat) {
            $endLng = $endLngs[$index] ?? null;

            if ($endLng !== null) {
                $algoritm = $travelTimeEstimator->estimateMotorTravelTime(
                    $startLat,
                    $startLng,
                    $endLat,
                    $endLng
                );

                $estimatedTime = $algoritm['estimated_time_minutes'];
                $distanceKm = $algoritm['distance_km'];

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

                $results[] = [
                    'distance_km' => $distanceKm,
                    'estimated_time_minutes' => $estimatedTime
                ];
            }
        }

        return response()->json($results);
    }


    public function calculateAstar(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'start_lat' => 'required|numeric',
            'start_lng' => 'required|numeric'
        ]);

        // Ambil inputan dari URL query
        $startLat = $request->start_lat;
        $startLng = $request->start_lng;
        $points = $request->points;

        $travelTimeEstimator = new TravelTimeEstimator();
        $results = $travelTimeEstimator->nearestNeighborRoute($points, $startLat, $startLng);


        return response()->json($results);
    }
}
