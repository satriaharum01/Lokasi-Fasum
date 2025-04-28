<?php

namespace App\Http\Helpers;

class TravelTimeEstimator
{
    /**
     * Hitung estimasi waktu tempuh (dalam menit) untuk kendaraan motor.
     *
     * @param float $startLat Latitude titik awal
     * @param float $startLng Longitude titik awal
     * @param float $endLat Latitude titik akhir
     * @param float $endLng Longitude titik akhir
     * @return float Estimasi waktu tempuh dalam menit
     */
    public function nearestNeighborRoute(array $points, float $startLat, float $startLng): array
    {
        $currentLat = $startLat;
        $currentLng = $startLng;

        // Inisialisasi results dengan data awal semua (tetap utuh)
        $results = [];
        foreach ($points as $index => $point) {
            $results[$index] = $point;
            $results[$index]['jarak'] = 0; // default jarak 0
        }

        $finalRoute = [];
        $visitedIndexes = [];

        while (count($visitedIndexes) < count($points)) {
            $nearestIndex = null;
            $nearestDistance = null;

            foreach ($results as $index => $point) {
                if (in_array($index, $visitedIndexes)) {
                    continue; // skip yang sudah dikunjungi
                }

                $distance = $this->haversineDistance($currentLat, $currentLng, $point['lat'], $point['lng']);

                if ($nearestDistance === null || $distance < $nearestDistance) {
                    $nearestDistance = $distance;
                    $nearestIndex = $index;
                }
            }

            if ($nearestIndex !== null) {
                $results[$nearestIndex]['jarak'] = $nearestDistance; // update jarak dari titik sebelumnya
                $finalRoute[] = $results[$nearestIndex];

                // Update start ke titik terdekat
                $currentLat = $results[$nearestIndex]['lat'];
                $currentLng = $results[$nearestIndex]['lng'];

                // Tandai sebagai sudah dikunjungi
                $visitedIndexes[] = $nearestIndex;
            }
        }

        return $finalRoute;
    }

    public function estimateMotorTravelTime($startLat, $startLng, $endLat, $endLng)
    {
        // Hitung jarak menggunakan Haversine Formula
        $distanceKm = $this->haversineDistance($startLat, $startLng, $endLat, $endLng);

        // Kecepatan rata-rata motor dalam km/jam
        $averageSpeedKmPerHour = 40; // asumsi kecepatan motor normal

        // Hitung waktu tempuh dalam jam
        $timeHours = $distanceKm / $averageSpeedKmPerHour;

        // Konversi waktu tempuh ke menit
        $timeMinutes = $timeHours * 60;

        return [
            'distance_km' => round($distanceKm, 2),
            'estimated_time_minutes' => round($timeMinutes, 2)
        ];
    }

    /**
     * Hitung jarak antara dua titik koordinat menggunakan rumus Haversine.
     *
     * @param float $lat1
     * @param float $lon1
     * @param float $lat2
     * @param float $lon2
     * @return float Jarak dalam kilometer
     */
    private function haversineDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadiusKm = 6371; // Jari-jari bumi dalam kilometer

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $lat1 = deg2rad($lat1);
        $lat2 = deg2rad($lat2);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             sin($dLon / 2) * sin($dLon / 2) * cos($lat1) * cos($lat2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadiusKm * $c;
    }
}
