import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';



const MarkerContent = ({ data, onDelete }) => (
  <div className="d-flex flex-column align-items-center" style={{ minWidth: '150px' }}>
    <span className="mb-2 fw-bold">{data.nama ?? data.halte_id ?? 'Node ' + data.id}</span>
    {data.type === '-' && (
      <button onClick={() => onDelete(data.id)} className="btn btn-sm btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
      </button>
    )}
  </div>
);
const deleteNode = (id) => {
  if (window.confirm('Yakin mau hapus node ini?')) {
    console.log('Menghapus node dengan id:', id);
    // TODO: Tambahkan logic delete API kalau perlu
  }
};

function InfoWindowContent({ handleClick }) {
  return (
    <div className="d-flex flex-column">
      <button className="btn btn-primary" onClick={handleClick}>
        Mulai di sini
      </button>
    </div>
  );
}

export function initClickListener(map, setMarkerPin, handleSelectStart) {

  const containerDiv = document.createElement('div');

  const root = createRoot(containerDiv);
  root.render(<InfoWindowContent handleClick={handleSelectStart} />);

  map.addListener('click', (e) => {
    const infowindow = new google.maps.InfoWindow({
      content: containerDiv,
    });

    const newMarker = new google.maps.Marker({
      position: e.latLng,
      map,
      icon: '/assets/static/marker-node.svg', // ganti ke path bener
    });

    newMarker.addListener('click', () => {
      infowindow.open({
        anchor: newMarker,
        map,
        shouldFocus: true,
      });
    });

    setMarkerPin(prevMarker => {
      if (prevMarker) {
        prevMarker.setMap(null);
      }
      return newMarker;
    });

  });
}


export function addMarker(data, setMarkers, map) {
  // Bikin elemen div kosong buat isi React
  const containerDiv = document.createElement('div');
  const root = createRoot(containerDiv);
  root.render(<MarkerContent data={data} onDelete={deleteNode} />);

  const infowindow = new google.maps.InfoWindow({
    content: containerDiv,
  });

  // Gunakan langsung iconMarker
  const marker = new google.maps.Marker({
    position: {
      lat: parseFloat(data.latitude),
      lng: parseFloat(data.longitude),
    },
    map: map,
    icon: data.markerIcon, // Gunakan langsung iconMarker
    jenis: data.jenis,
    tempat: data.nama,
    alamat: data.alamat,
    jarak: 0,
    waktu: 0,
    lat: parseFloat(data.latitude),
    lng: parseFloat(data.longitude),
  });

  marker.addListener('click', () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: true,
    });
  });

  marker.addListener('rightclick', () => {
    console.log('Right clicked marker:', data);
  });

  setMarkers((prev) => [...prev, marker]);
};

const MapMarkers = ({ newMarkers, setMarkers, map }) => {
  useEffect(() => {
    console.log(newMarkers);
    newMarkers.forEach((data) => {
      addMarker(data);
    });
    // eslint-disable-next-line
  }, [newMarkers]);

  return null; // Tidak perlu mengembalikan JSX apapun
};

export default MapMarkers;
