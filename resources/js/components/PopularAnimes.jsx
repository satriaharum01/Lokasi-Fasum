import React, { useEffect, useState } from 'react';
import ProductItemV2 from './ProductItemV2';
import Api from '../api';

function PopularAnimes() {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await Api.get('/comics/popular'); // Ganti dengan endpoint yang sesuai
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
            <div className="popular__product pb-0 mb-0 bg-dark col-lg-12">
                <div className="row bg-info py-3 mb-2 ">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="section-title mb-0">
                            <h4>Terpopuler Hari Ini</h4>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <div className="btn__all mb-0">
                            <a href="#" className="primary-btn">View All <span className="arrow_right"></span></a>
                        </div>
                    </div>
                </div>
                <div className="popular_slider ">

                    {animeData.map(anime => (
                        <ProductItemV2 key={anime.id} data={anime} isColored={anime.isColored ? (true): (false)}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PopularAnimes;
