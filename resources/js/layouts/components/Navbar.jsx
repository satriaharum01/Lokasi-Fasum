// src/layouts/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavbarItem = ({ path, label }) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Check if the current location matches the path
        setIsActive(location.pathname === path);
    }, [location.pathname, path]);

    return (
        <li className={isActive ? 'active' : ''}>
            <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            >
                {label}
            </NavLink>
        </li>
    );
};

function Navbar({ isLoggedIn }) {
    return (
        <>
            <nav className="header__menu mobile-menu">
                <ul>
                    <NavbarItem path="/home" label="Homepage" />
                    <NavbarItem path="/categories" label="Categories" />
                    <NavbarItem path="/blog" label="Our Blogs" />
                    {isLoggedIn ? (
                        <>
                            <NavbarItem path="/admin" label="Dashboard" />
                        </>
                    ) : (
                        <>

                            <NavbarItem path="/login" label="Login" />
                        </>
                    )}
                    {/* Add more NavbarItem components for additional pages */}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
