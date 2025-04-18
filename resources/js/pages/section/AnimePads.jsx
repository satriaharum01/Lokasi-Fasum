import React from 'react';
import TrendingAnimes from '../../components/TrendingAnimes';
import PopularAnimes from '../../components/PopularAnimes';
import RecentAnimes from '../../components/RecentAnimes';
import LiveAnimes from '../../components/LiveAnimes';
import SidebarTopViews from '../../components/SidebarTopViews';
import SidebarComments from '../../components/SidebarComments';

function AnimePads() {
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className='pb-3 mb-4 row'>
                        <PopularAnimes />
                    </div>
                    <div className="row">
                        <div className="col-lg-8 px-0">
                            <TrendingAnimes />
                            <RecentAnimes />
                            <LiveAnimes />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="product__sidebar">
                                <SidebarTopViews />
                                <SidebarComments />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AnimePads;
