import { useEffect, useRef, useState } from "react";
import api from "../apilogin";

// Fungsi untuk memuat Google Maps API
function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDo9HRRCCPaSc56lFFDzT2V0xOYPI8OA9U&callback=initMap&libraries=places&v=weekly&language=id&region=ID";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function PublicMap() {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);

    // Inisialisasi peta dan menambahkan marker
    const initMap = () => {
        const map = new google.maps.Map(mapRef.current, {
            center: {
                lat: parseFloat(import.meta.env.VITE_DEFAULT_LAT) || -6.1751, // Default jika tidak ada di .env
                lng: parseFloat(import.meta.env.VITE_DEFAULT_LNG) || 106.8650, // Default jika tidak ada di .env
            },
            mapTypeControl: false,
            zoom: parseInt(import.meta.env.VITE_DEFAULT_ZOOM) || 10, // Default zoom level jika tidak ada
        });

        // Menambahkan marker ke peta
        markers.forEach((markerData) => {
            new google.maps.Marker({
                position: { lat: markerData.lat, lng: markerData.lng },
                map: map,
                title: markerData.title,
            });
        });
    };

    // Memuat Google Maps API dan menunggu sampai selesai
    useEffect(() => {
        const loadMap = async () => {
            try {
                await loadGoogleMapsAPI(); // Menunggu sampai script selesai dimuat
                window.initMap = initMap;  // Menetapkan initMap ke window
            } catch (error) {
                console.error("Error loading Google Maps API:", error);
            }
        };

        loadMap();
        
    }, []);  // Hanya dijalankan sekali saat komponen pertama kali dimuat

    return (
        <div>
            <div id="map" ref={mapRef} style={{ width: "100%", height: "90vh" }}></div>
        </div>
    );
}

export default PublicMap;
