import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Api from '../api';
import Preloader from '../components/InnerPreloader';

function FasumCard({ data, index }) {
    return (
        <div className="col col-12 col-md-3 mb-4" key={index}>
            <div className="card">
                <a href={`https://maps.google.com/?q=${data.nama}`} target='_blank' className={`badge ribbon ${data.jenis === 'SPBU' ? 'bg-danger' : ''}`}>
                    {data.jenis}
                </a>
                <a href={`https://maps.google.com/?q=${data.nama}`} target='_blank' className="card-img">
                    <img
                        src={`/img/fasum/${data.cover_image}`}
                        className="card-img-top"
                        alt={`foto ${data.nama}`}
                    />
                </a>
                <div className="card-body">
                    <a href={`https://maps.google.com/?q=${data.nama}`} target='_blank'>
                        <h3 className="card-title fw-bold" style={{ fontSize: "11pt" }}>{data.nama}</h3>
                    </a>
                    <div className="card-text two-line-ellipsis" style={{ fontSize: "10pt" }}>
                        {data.alamat}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FasumList({ subTitle }) {
    const [fasum, setFasum] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1); // untuk load more
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFasum();
    }, [page]);

    const fetchFasum = async (search = "") => {
        try {
            const response = await Api.get("/get/fasum/paginate", {
                params: { search, page },
            });

            if (page === 1) {
                setFasum(response.data.data); // awal load
            } else {
                setFasum(prev => [...prev, ...response.data.data]); // load more
            }

            if (response.data.data.length === 0) {
                setHasMore(false); // kalau data habis
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally{
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setPage(1); // reset ke page 1 saat search
        setHasMore(true); // aktifkan lagi tombol load
        setLoading(true);
        fetchFasum(searchTerm);
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>

            <div className="container pt-4 bg-gradient-faded-info-vertical">
                <div className="mb-2">
                    <div className='d-flex justify-content-between'>
                        <h2 className="fw-bold text-white">Data {subTitle}</h2>

                        <div className="d-flex ">
                            <input
                                type="search"
                                className="form-control border px-2 text-white"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Cari Fasilitas Umum..."
                            />
                            <button className="btn btn-primary" role="button" onClick={handleSearch}>
                                <i className='fa fa-search'></i>
                                Cari
                            </button>
                        </div>
                    </div>

                    <hr class="horizontal light mt-0 mb-2"></hr>
                </div>
                <div className="row mt-3" id="ClassContent">
                    {loading ? <Preloader /> : (
                        fasum.map((data) => (
                            <FasumCard data={data} key={data.id} />
                        ))
                    )}
                </div>

                {hasMore && (
                    <div className="text-center py-3">
                        <button type="button" className="btn btn-primary" onClick={loadMore}>
                            Load More <i className="fas fa-plus-circle"></i>
                        </button>
                    </div>
                )}
            </div>
        </>

    );
}

export default FasumList;