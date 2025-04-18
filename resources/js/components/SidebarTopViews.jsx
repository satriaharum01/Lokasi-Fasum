import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Api from '../api';

function SidebarTopViews() {
    const products = [
        {
            id: 1,
            title: "Boruto: Naruto Next Generations",
            views: 9141,
            image: "img/sidebar/tv-1.jpg",
            episodes: "18 / ?",
            categories: ["day", "years"],
        },
        {
            id: 2,
            title: "The Seven Deadly Sins: Wrath of the Gods",
            views: 9141,
            image: "img/sidebar/tv-2.jpg",
            episodes: "18 / ?",
            categories: ["month", "week"],
        },
        {
            id: 3,
            title: "Sword Art Online: Alicization - War of Underworld",
            views: 9141,
            image: "img/sidebar/tv-3.jpg",
            episodes: "18 / ?",
            categories: ["week", "years"],
        },
        {
            id: 4,
            title: "Fate/Stay Night: Heaven's Feel I. Presage Flower",
            views: 9141,
            image: "img/sidebar/tv-4.jpg",
            episodes: "18 / ?",
            categories: ["years", "month"],
        },
        {
            id: 5,
            title: "Fate Stay Night: Unlimited Blade Works",
            views: 9141,
            image: "img/sidebar/tv-5.jpg",
            episodes: "18 / ?",
            categories: ["day"],
        },
    ];

    return (
        <>
            <div className="product__sidebar__view">
                <div className="section-title">
                    <h5>Top Views</h5>
                </div>
                <ul className="filter__controls">
                    <li className="active mixitup-control-active" data-filter="*">Day</li>
                    <li data-filter=".week" className="">Week</li>
                    <li data-filter=".month" className="">Month</li>
                    <li data-filter=".years" className="">Years</li>
                </ul>
                <div className="filter__gallery">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`product__sidebar__view__item set-bg mix ${product.categories.join(' ')}`}
                            style={{ backgroundImage: `url(${product.image})` }}
                            data-setbg={product.image}
                        >
                            <div className="ep">{product.episodes}</div>
                            <div className="view"><i className="fa fa-eye"></i> {product.views}</div>
                            <h5><a href="#">{product.title}</a></h5>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SidebarTopViews;
