// src/layouts/components/Header.js
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../apilogin';
import '../../libs/js/jquery-3.3.1.min.js';
import '../../libs/js/jquery.slicknav.js';


function Header({isLoggedIn,setIsLoggedIn}) {

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

        return <button className="btn btn-outline-info ml-2 text-warning" onClick={handleLogout}>Logout</button>;
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
        // Mendapatkan user aktif dari sesi
        const fetchUser = async () => {
            try {
                const response = await api.get('/api/user');
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                console.log('Not authenticated');
            }
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
                        <div className="col-lg-2">
                            <div className="header__logo">
                                <NavLink to="/home"><img src="img/logo.webp" alt="Logo" /></NavLink>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="header__nav">
                                <Navbar isLoggedIn={isLoggedIn} />
                            </div>
                        </div>
                        <div className="col-lg-4 align-self-center">
                            <div className="header__right p-0 text-white">
                                {isLoggedIn ? (
                                    <>
                                        Welcome, {user?.username}
                                        <Logout onLogout={handleLogout} />
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/search"><span className="icon_search"></span></NavLink>
                                        <NavLink to="/login"><span className="icon_profile"></span></NavLink>
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
