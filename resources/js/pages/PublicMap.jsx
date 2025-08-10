import { useEffect, useRef, useState } from "react";
import MapMarkers, {
    addMarker,
    initClickListener,
} from "../components/map/MapMarkers";
import { getWaypoints } from "../utils/routeHelper";
import { estimateTravelTime } from "../components/map/EstimateDistance";
import { estimateShortestPath } from "../components/map/EstimateDistinations";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Aside, { Lside } from "../layouts/components/Aside";
import { Modal, Button } from "react-bootstrap";
import FilterDataAccordion from "../layouts/components/FilterDataAccordion";
import ListDataAccordion from "../layouts/components/ListDataAccordion";
import { RouteList, RouteListModal } from "../components/map/RouteList";
import api from "../api";
// Fungsi untuk memuat Google Maps API
function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            // Google Maps API sudah dimuat
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDo9HRRCCPaSc56lFFDzT2V0xOYPI8OA9U&libraries=places&v=weekly&language=id&region=ID";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Fungsi untuk menampilkan SweetAlert loading
const callSwall = (loading) => {
    if (loading) {
        Swal.fire({
            title: "Load Map...",
            text: "Please wait while loading your data.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    } else {
        Swal.close();
        withReactContent(Swal).fire({
            title: "Map berhasil ditampilkan!",
            text: "",
            icon: "success",
            timer: 1000,
        });
    }
};

function PublicMap() {
    const mapRef = useRef(null);
    const handleSelectStartRef = useRef(() => {});
    const [map, setDisplayMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [polyline, setPolyline] = useState(null);
    const [jenisData, setJenisData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [activeJenis, setActiveJenis] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [routeData, setRouteData] = useState([]);
    const [loadingJenis, setLoadingJenis] = useState(true); // Loading untuk jenisData
    const [loadingMarkers, setLoadingMarkers] = useState(true); // Loading untuk markers
    const [loadingRoute, setLoadingRoute] = useState(true);
    const [loadingEst, setLoadingEst] = useState(true);
    const [markerPin, setMarkerPin] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const directionPanelRef = useRef(null);

    //Aside Control
    const [handleButton, setHandleButton] = useState(false);
    //Lside Control
    const [handleButtonRute, setHandleButtonRute] = useState(false);

    // Menampilkan marker berdasarkan activeJenis
    const filteredMarkers = markers
        .filter((marker) => activeJenis.includes(marker.jenis))
        .map((data) => ({
            ...data,
            checked: false, // Set default checked ke false
        }));

    // Saat activeJenis berubah, update activeData dari markers
    useEffect(() => {
        const newActiveData = markers
            .filter((marker) => activeJenis.includes(marker.jenis))
            .map((marker) => ({
                ...marker,
                checked: false, // Defaultnya
            }));

        setActiveData(newActiveData); // Save ke state supaya bisa ubah checked
        setTempData(newActiveData);
        setLoadingEst(false);
        setLoadingRoute(true);
    }, [activeJenis, markers]);

    // Menangani perubahan checkbox untuk Data Fasum
    const handleDataCheckChange = (updatedItems) => {
        const aktifData = updatedItems.filter((item) => item.checked);
        setRouteData(aktifData);
        setActiveData(updatedItems);
        setTempData(updatedItems);
        setLoadingRoute(true);
    };

    // Menangani perubahan checkbox FIlter Jenis
    const handleCheckboxChange = (updatedItems) => {
        const aktifJenis = updatedItems
            .filter((item) => item.checked)
            .map((item) => item.jenis);
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

    // Set jarak masing masing titik saat titik mulai dipilih
    const handleSetStart = async (startLat, startLng) => {
        const apiUrl = "/map/calculate/time";

        try {
            const updatedData = await estimateTravelTime(
                activeData,
                startLat,
                startLng,
                apiUrl,
            );
            setActiveData(updatedData);
            setTempData(updatedData);
        } catch (error) {
            console.error("Error updating distances:", error);
        } finally {
            setLoadingEst(false);
        }
    };

    // Tangani button titik Mulai
    const handleSelectStart = () => {
        if (!startPosition) {
            console.log("Belum ada posisi start");
            return;
        }
        setLoadingEst(true);
        setLoadingRoute(true);
        handleSetStart(startPosition.lat, startPosition.lng);
        setHandleButtonRute(true);
    };

    // Button Trigger
    const handleSelectRoute = () => {
        //console.log(routeData);
        if (routeData.length <= 0) {
            console.log("Route Data Kosong !");
            return;
        }

        handleSetRoute(startPosition.lat, startPosition.lng);
    };

    // Set Route Data ketika tombol peta di cek
    const handleSetRoute = async (startLat, startLng) => {
        const apiUrl = "/map/calculate/route";

        try {
            const updatedData = await estimateShortestPath(
                routeData,
                startLat,
                startLng,
                apiUrl,
            );

            //console.log("Updated data:", updatedData);
            setRouteData(updatedData);
        } catch (error) {
            console.error("Error updating Path:", error);
        } finally {
            setLoadingRoute(false);
            console.log("Route data:", routeData);
        }
    };

    // Reff Function
    useEffect(() => {
        handleSelectStartRef.current = handleSelectStart;
    }, [handleSelectStart]);
    // Mengambil data jenis dari API
    useEffect(() => {
        const fetchJenisData = async () => {
            try {
                const response = await api.get("/get/jenis");
                const updatedJenisData = response.data.map((data) => ({
                    ...data,
                    checked: true, // Set default checked ke true
                }));
                setJenisData(updatedJenisData);

                const allJenis = updatedJenisData.map((data) => data.jenis);
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
            title: "Load Markers...",
            text: "Please wait while loading your data.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const timer = setTimeout(async () => {
            try {
                const response = await api.get("/map/get/fasum");
                setMarkers([]);
                response.data.forEach((data) => {
                    addMarker(data, setMarkers, map);
                });
            } catch (error) {
                console.error("Error fetching markers:", error);
            } finally {
                setLoadingMarkers(false);
                Swal.close();
                withReactContent(Swal).fire({
                    title: "Markers berhasil ditampilkan!",
                    text: "",
                    icon: "success",
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
                lng: parseFloat(import.meta.env.VITE_DEFAULT_LNG) || 106.865,
            },
            mapTypeControl: false,
            zoom: parseInt(import.meta.env.VITE_DEFAULT_ZOOM) || 10,
        });

        const renderer = new window.google.maps.DirectionsRenderer({
            suppressMarkers: false, // jika mau marker default
            preserveViewport: false,
        });

        const directionsServiceInstance = new google.maps.DirectionsService();

        renderer.setMap(mapInstance);

        setDisplayMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(renderer);
    };

    // Memuat Google Maps API dan menunggu sampai selesai
    useEffect(() => {
        const loadMap = async () => {
            try {
                await loadGoogleMapsAPI();
                initMap();
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
            setLoadingRoute(true);
        }
    }, [markerPin]);

    // Memunculkan loading saat pemuatan peta
    useEffect(() => {
        callSwall(true);
        if (!map) return;
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

    const showRouteModal = () => {
        // You can add your modal logic here
        setModalOpen(true);
        createDirection(
            startPosition.lat,
            startPosition.lng,
            routeData,
            directionsRenderer,
            directionPanelRef,
        );
    };

    const createDirection = (
        startLat,
        endLng,
        routeDataList,
        directionsRenderer,
        directionPanelRef,
    ) => {
        const startPoint = { lat: startLat, lng: endLng };
        const { endPoint, waypoints } = getWaypoints(routeDataList);

        console.log(routeDataList.length);
        const request = {
            origin: startPoint,
            destination: {
                lat: parseFloat(endPoint.lat),
                lng: parseFloat(endPoint.lng),
            },
            waypoints: waypoints,
            travelMode: window.google.maps.TravelMode.DRIVING,
            optimizeWaypoints: true, // reorder waypoints for best route
        };

        directionsService.route(request, (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
                directionsRenderer.setPanel(directionPanelRef.current);
            } else {
                console.log("Problem in showing direction due to " + status);
            }
        });
    };
    return (
        <>
            <Aside
                handleButton={handleButton}
                setHandleButton={setHandleButton}
            >
                {loadingJenis ? (
                    <div className="ml-4">
                        <i className="fa fa-spinner fa-spin"></i> Loading
                        ...{" "}
                    </div>
                ) : (
                    <FilterDataAccordion
                        jenisData={jenisData}
                        onCheckboxChange={handleCheckboxChange}
                    />
                )}

                {/* !handleButtonRute && loadingRoute ? ' ' : <RouteList route={routeData} loadingRoute={loadingRoute} /> */}
                {!handleButtonRute && loadingRoute ? (
                    <li className="nav-item">
                        <button
                            type="button"
                            className="col-12 btn btn-danger"
                            onClick={initMap}
                        >
                            <i className="fa fa-refresh"></i> Reset Map
                        </button>
                    </li>
                ) : (
                    <li className="nav-item">
                        <button
                            type="button"
                            className="col-12 btn btn-success"
                            onClick={showRouteModal}
                        >
                            <i className="fa fa-eye"></i> Show Route
                        </button>
                    </li>
                )}
            </Aside>
            <div>
                <div
                    id="map"
                    ref={mapRef}
                    style={{ width: "100%", height: "90vh" }}
                ></div>
            </div>
            <Lside
                handleButton={handleButton}
                handleButtonRute={handleButtonRute}
                setHandleButton={handleSelectRoute}
            >
                {loadingJenis ? (
                    <div className="ml-4">
                        <i className="fa fa-spinner fa-spin"></i> Loading
                        ...{" "}
                    </div>
                ) : (
                    <ListDataAccordion
                        data={activeData}
                        setData={setActiveData}
                        originData={tempData}
                        onCheckboxChange={handleDataCheckChange}
                        loadingEst={loadingEst}
                        setLoadingEst={setLoadingEst}
                    />
                )}
            </Lside>
            <RouteListModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                directionPanelRef={directionPanelRef}
                loadingRoute={loadingRoute}
            />
        </>
    );
}

export default PublicMap;
