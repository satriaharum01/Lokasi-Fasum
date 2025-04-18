import React, { useEffect, useState } from 'react';
import '../../libs/js/jquery-3.3.1.min.js';
import '../../libs/js/owl.carousel.min.js';
import Api from '../../api.jsx';

function Hero() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get('/hero'); // Ganti sesuai endpoint API agan
                setDataList(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading && dataList.length > 0) {
            // Set background image dari data-setbg
            const elements = document.querySelectorAll('.set-bg');
            elements.forEach((element) => {
                const bg = element.getAttribute('data-setbg');
                if (bg) {
                    element.style.backgroundImage = `url(${bg})`;
                }
            });

            // Inisialisasi Owl Carousel
            $('.hero__slider').owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                nav: true,
                navText: [
                    "<span class='arrow_carrot-left'></span>",
                    "<span class='arrow_carrot-right'></span>",
                ],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                mouseDrag: false,
            });
        }
    }, [loading, dataList]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="hero">
            <div className="container">
                <div className="hero__slider owl-carousel">
                    {dataList.map((slide, index) => (
                        <div
                            key={index}
                            className="hero__items set-bg"
                            data-setbg={`img/comics_bg/${slide.background}`}
                        >
                            <div className="row">
                                <div className="col-lg-5 ">
                                    <div className="hero__text bg-dark-opacity-10 px-3 py-2 rounded-25">
                                        <h2 className='mt-0'>{slide.title}</h2>
                                        <p>{slide.description}</p>
                                        <a href="#" >
                                            <span className='bg-info'>Baca Sekarang</span> <i className="fa fa-angle-right bg-info"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero;
