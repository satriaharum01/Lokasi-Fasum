import React, { useEffect } from 'react';

function AnimePads() {
    
    useEffect(() => {
        const elements = document.querySelectorAll('.set-bg');
        elements.forEach((element) => {
            const bg = element.getAttribute('data-setbg');
            if (bg) {
                element.style.backgroundImage = `url(${bg})`;
            }
        });
    }, []);
    return (
        <>
            <section className="normal-breadcrumb set-bg" data-setbg="img/normal-breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>Login</h2>
                                <p>Welcome to the official Anime blog.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AnimePads;
