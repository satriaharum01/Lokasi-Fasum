import { useEffect, useRef, useState } from "react";
import MapMarkers from "../components/map/MapMarkers";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

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

const callSwall = (loading) => {
    if (loading) {
        Swal.fire({
            title: 'Load Map...',
            text: 'Please wait while loading your data.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    } else {
        Swal.close();
        withReactContent(Swal).fire({
          title: 'Map berhasil ditampilkan!',
          text: '',
          icon: 'success',
          timer: 1000,
        });
    };
}

function PublicMap() {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null)
    const [loading, setLoading] = useState(true);
    // Inisialisasi peta dan menambahkan marker
    const initMap = () => {
        const mapInstance = new google.maps.Map(mapRef.current, {
            center: {
                lat: parseFloat(import.meta.env.VITE_DEFAULT_LAT) || -6.1751,
                lng: parseFloat(import.meta.env.VITE_DEFAULT_LNG) || 106.8650,
            },
            mapTypeControl: false,
            zoom: parseInt(import.meta.env.VITE_DEFAULT_ZOOM) || 10,
        });

        setMap(mapInstance);
        // Setelah map siap, kita render marker

    };

    // Memuat Google Maps API dan menunggu sampai selesai
    useEffect(() => {
        const loadMap = async () => {
            try {
                await loadGoogleMapsAPI(); // Menunggu sampai script selesai dimuat
                window.initMap = initMap; // Menetapkan initMap ke window
            } catch (error) {
                console.error("Error loading Google Maps API:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMap();
    }, []);  // Hanya dijalankan sekali saat komponen pertama kali dimuat
   
    // Menampilkan loading saat map sedang dimuat
    useEffect(() => {
        // Trigger loading setiap route berubah
        callSwall(true);
        const timer = setTimeout(() => {
            setLoading(false);
            callSwall(false);
        }, 3000); // waktu loading-nya bisa diatur sesuai selera
        return () => clearTimeout(timer);   
    }, []);

    return (
        <div>
            <div id="map" ref={mapRef} style={{ width: "100%", height: "90vh" }}></div>
            {map && <MapMarkers map={map} />} {/* Render MapMarkers hanya jika peta sudah siap */}
        </div>
    );

}

export default PublicMap;
