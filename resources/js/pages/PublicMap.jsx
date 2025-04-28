import { useEffect, useRef, useState } from "react";
import MapMarkers, { addMarker, initClickListener } from "../components/map/MapMarkers";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Aside, { Lside } from '../layouts/components/Aside';
import FilterDataAccordion from "../layouts/components/FilterDataAccordion";
import ListDataAccordion from "../layouts/components/ListDataAccordion";
import api from "../api";

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
// Fungsi untuk menampilkan SweetAlert loading
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
    }
}

function PublicMap() {
    const mapRef = useRef(null);
    const handleSelectStartRef = useRef(() => { });
    const [map, setDisplayMap] = useState(null);
    const [jenisData, setJenisData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [activeJenis, setActiveJenis] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [loadingJenis, setLoadingJenis] = useState(true); // Loading untuk jenisData
    const [loadingMarkers, setLoadingMarkers] = useState(true); // Loading untuk markers
    const [markerPin, setMarkerPin] = useState(null);
    const [startPosition, setStartPosition] = useState(null);

    //Aside Control
    const [handleButton, setHandleButton] = useState(false);
    //Lside Control
    const [handleButtonRute, setHandleButtonRute] = useState(false);

    // Menampilkan marker berdasarkan activeJenis
    const filteredMarkers = markers
        .filter(marker => activeJenis.includes(marker.jenis))
        .map(data => ({
            ...data,
            checked: false, // Set default checked ke false
        }));

    // Saat activeJenis berubah, update activeData dari markers
    useEffect(() => {
        const newActiveData = markers
            .filter(marker => activeJenis.includes(marker.jenis))
            .map(marker => ({
                ...marker,
                checked: false, // Defaultnya
            }));

        setActiveData(newActiveData); // Save ke state supaya bisa ubah checked
    }, [activeJenis, markers]);

    // Menangani perubahan checkbox untuk Data Fasum
    const handleDataCheckChange = (updatedItems) => {
        setActiveData(updatedItems);
    };

    // Menangani perubahan checkbox FIlter Jenis
    const handleCheckboxChange = (updatedItems) => {
        const aktifJenis = updatedItems
            .filter(item => item.checked)
            .map(item => item.jenis);
        setActiveJenis(aktifJenis); // Update kategori aktif
    };

    const hideMarkers = () => {
        markers.forEach((marker, index) => {
            if (activeJenis.includes(marker.jenis)) {
                marker.setMap(map); // Menampilkan marker jika jenis sesuai
            } else {
                marker.setMap(null); // Menyembunyikan marker jika jenis tidak sesuai
            }
        });

    };

    // Tangani button titik Mulai
    const handleSelectStart = () => {
        if (!startPosition) {
            console.log('Belum ada posisi start');
            return;
        }
        setHandleButtonRute(true);
    };

    useEffect(() => {
        handleSelectStartRef.current = handleSelectStart;
    }, [handleSelectStart]);
    // Mengambil data jenis dari API
    useEffect(() => {
        const fetchJenisData = async () => {
            try {
                const response = await api.get('/get/jenis');
                const updatedJenisData = response.data.map((data) => ({
                    ...data,
                    checked: true, // Set default checked ke true
                }));
                setJenisData(updatedJenisData);

                const allJenis = updatedJenisData.map(data => data.jenis);
                setActiveJenis(allJenis);
            } catch (err) {
                console.error("Error fetching jenis data:", err);
            } finally {
                setLoadingJenis(false);
            }
        };

        fetchJenisData();
    }, []);

    // Mengambil data marker dari API
    const getDataMarkers = () => {
        Swal.fire({
            title: 'Load Markers...',
            text: 'Please wait while loading your data.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const timer = setTimeout(async () => {
            try {
                const response = await api.get('/map/get/fasum');
                setMarkers([]);
                response.data.forEach((data) => {
                    addMarker(data, setMarkers, map);
                });
            } catch (error) {
                console.error('Error fetching markers:', error);
            } finally {
                setLoadingMarkers(false);
                Swal.close();
                withReactContent(Swal).fire({
                    title: 'Markers berhasil ditampilkan!',
                    text: '',
                    icon: 'success',
                    timer: 1000,
                });
            }
        }, 3000); // Waktu loading bisa disesuaikan

        return () => clearTimeout(timer);


    };
    // Memanggil fungsi untuk menyembunyikan marker berdasarkan kategori aktif
    useEffect(() => {
        if (map && markers.length > 0) {
            hideMarkers();
        }
    }, [filteredMarkers]);

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

        setDisplayMap(mapInstance);
    };

    // Memuat Google Maps API dan menunggu sampai selesai
    useEffect(() => {
        const loadMap = async () => {
            try {
                await loadGoogleMapsAPI();
                window.initMap = initMap;
            } catch (error) {
                console.error("Error loading Google Maps API:", error);
            } finally {

            }
        };

        loadMap();
    }, []);

    // Marker Pin Event
    useEffect(() => {
        if (!markerPin) return;

        const position = markerPin.getPosition();
        if (position) {
            setStartPosition({
                lat: position.lat(),
                lng: position.lng(),
            });
            setHandleButtonRute(false);
        }
    }, [markerPin]);

    // Memunculkan loading saat pemuatan peta
    useEffect(() => {
        callSwall(true);
        const timer = setTimeout(() => {
            setLoadingJenis(false);
            callSwall(false);
            getDataMarkers();
            initClickListener(map, setMarkerPin, () => {
                handleSelectStartRef.current();
            });
        }, 3000); // Waktu loading bisa disesuaikan
        return () => clearTimeout(timer);
    }, [map]);

    return (
        <>
            <Aside handleButton={handleButton} setHandleButton={setHandleButton}>
                {loadingJenis ? <div className="ml-4">Loading ... </div> : <FilterDataAccordion
                    jenisData={jenisData}
                    onCheckboxChange={handleCheckboxChange}
                />}

            </Aside>
            <div>
                <div id="map" ref={mapRef} style={{ width: "100%", height: "90vh" }}></div>
            </div>
            <Lside handleButton={handleButton} handleButtonRute={handleButtonRute} setHandleButton={setHandleButtonRute}>
                {loadingJenis ? <div className="ml-4">Loading ... </div> : <ListDataAccordion
                    data={activeData}
                    onCheckboxChange={handleDataCheckChange}
                />}
            </Lside>
        </>
    );
}

export default PublicMap;
