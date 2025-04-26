// src/layouts/components/Header.js
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../apilogin';
import '../../libs/js/jquery-3.3.1.min.js';
import '../../libs/js/jquery.slicknav.js';
import logo from '../../../../public/assets/img/logo.png';


function Header({ isLoggedIn, setIsLoggedIn }) {

    const [user, setUser] = useState(null);

    const Logout = ({ onLogout }) => {
        const handleLogout = async () => {
            try {
                await api.post('api/logout');
                onLogout();
                setIsLoggedIn(false);
            } catch (error) {
                //console.error('Logout failed', error);
            }
        };

        return <button className="btn btn-outline-white pull-right mb-0 text-danger" onClick={handleLogout}>Logout</button>;
    };

    useEffect(() => {
        // Initialize SlickNav on the specified element
        $('.mobile-menu').slicknav({
            label: '',
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true,
        });
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            await api.get('/api/user')
                .then((response) => {
                    setUser(response.data);
                    setIsLoggedIn(true);
                })
                .catch((e) => {
                    console.log('User not authenticated or session expired.');
                    setIsLoggedIn(false);
                });
        };

        fetchUser();
    }, [isLoggedIn]);



    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };
    return (
        <>
            <header className="header">
                <div className="container mr-5">
                    <div className="row">
                        <div className="col-lg-1 row align-items-center pull-left">
                            <div className=" header-brand ">
                                <NavLink to="/home">
                                    <img src={logo} className="header-brand-img" alt="Logo" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="header__nav pull-left">
                                <Navbar isLoggedIn={isLoggedIn} />
                            </div>
                        </div>
                        <div className="col-lg-4 align-self-center">
                            <div className="header__right p-0 text-white">
                                {isLoggedIn ? (
                                    <>
                                        
                                        <Logout onLogout={handleLogout} />
                                    </>
                                ) : (
                                    <>
                                        <span className="icon_profile" onClick={() => window.location.href = '/login'} style={{ cursor: 'pointer' }}></span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header>
        </>
    );
}

export default Header;
