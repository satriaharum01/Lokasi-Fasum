import api from "../../api";

/**
 * Update distance field inside your existing data array based on start point.
 *
 * @param {Array} data - Existing data array
 * @param {number} startLat - Starting latitude
 * @param {number} startLng - Starting longitude
 * @param {string} apiUrl - API URL for estimating distance
 * @returns {Promise<Array>} Updated array with distance filled
 */

export async function estimateShortestPath(data, startLat, startLng, apiUrl) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Data array is required and cannot be empty');
    }

    const endPoints = data.map(item => ({
        lat: item.lat, // pastikan nama field lat/lng ada di item
        lng: item.lng,
        nama: item.tempat,
    }));

    const params = {
        start_lat: startLat,
        start_lng: startLng,
        points: endPoints,
    };

    try {
        const response = await api.get(apiUrl, { params });
        const distances = response.data; // expect array dari backend

        // Update original data with distance
        //const updatedData = data.map((item, index) => ({
        //    ...item,
        //    jarak: distances[index]?.distance_km ?? 0, // default 0 kalau gagal
        //    waktu: distances[index]?.estimated_time_minutes ?? 0, // default 0 kalau gagal
        //}));

        return distances;
    } catch (error) {
        console.error('Failed to update distance:', error);
        throw error;
    }
}