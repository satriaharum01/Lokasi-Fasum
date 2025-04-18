import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Api from '../api';

function LiveAnimes() {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await Api.get('/comics/live'); // Ganti dengan endpoint yang sesuai
                setAnimeData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="live__product">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="section-title">
                            <h4>Live Action</h4>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <div className="btn__all">
                            <a href="#" className="primary-btn">View All <span className="arrow_right"></span></a>
                        </div>
                    </div>
                </div>
                <div className="row">

                    {animeData.map(anime => (
                        <ProductItem key={anime.id} title={anime.title} image={anime.cover_image} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default LiveAnimes;
