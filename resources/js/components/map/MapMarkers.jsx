import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import iconMarker from '../../assets/static/marker-lazismu.png';
import api from '../../api'; // Pastikan path Api ente

const MapMarkers = ({ map }) => {
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await api.get('/map/get/fasum');
        response.data.forEach((data) => {
          addMarker(data);
        });
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
    // eslint-disable-next-line
  }, []); // Empty array means this effect will only run once when the component is mounted

  const deleteNode = (id) => {
    if (window.confirm('Yakin mau hapus node ini?')) {
      console.log('Menghapus node dengan id:', id);
      // TODO: Tambahkan logic delete API kalau perlu
    }
  };

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

  const addMarker = (data) => {
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
      icon: iconMarker, // Gunakan langsung iconMarker
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
  };

  return null; // Tidak perlu mengembalikan JSX apapun
};

export default MapMarkers;
