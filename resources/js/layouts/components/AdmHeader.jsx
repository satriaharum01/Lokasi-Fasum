// src/layouts/components/Header.js
import React, { useEffect, useRef, useState, } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import api from '../../apilogin';
import '../../libs/js/jquery-3.3.1.min.js';
import '../../libs/js/jquery.slicknav.js';
import logo from '../../../../public/assets/img/logo.png';
import LogoutModal from './LogoutModal.jsx';

const NavbarItem = ({ path, label, isDropdown = false, children, ico = '' }) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Check if the current location matches the path
        setIsActive(location.pathname === path);
    }, [location.pathname, path]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <li className={`nav-item ${isActive ? 'active' : ''} ${isDropdown ? 'dropdown' : ''}`}>
            {/* For regular NavLink */}
            {!isDropdown ? (
                <NavLink to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link'}`}>
                    <i className="fe">
                        <FeatherIcon icon={ico} size={15} />
                    </i> {label}

                </NavLink>
            ) : (
                // For dropdown
                <>
                    <a
                        href="#"
                        className="nav-link"
                        data-toggle="dropdown"
                        onClick={toggleDropdown}
                    >
                        <i className="fe">
                            <FeatherIcon icon={ico} size={15} />
                        </i> {label}
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu show dropdown-menu-arrow">
                            {children}
                        </div>
                    )}
                </>
            )}
        </li>
    );
};
const UserAvatarDropdown = ({ user, setIsLoggedIn, setUser }) => {
    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const ucfirst = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProfileClick = () => {
        if (user.level === 'Administrator') {
            navigate('/admin/profile');
        } else if (user.level === 'Manajer') {
            navigate('/manajer/profile');
        }
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            await api.post('api/logout');
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="d-flex order-lg-2 ml-auto" ref={dropdownRef}>
            <div className="dropdown">
                <a
                    href="#"
                    className="nav-link pr-0 leading-none"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(!open);
                    }}
                >
                    <span
                        className="avatar"
                        style={{
                            backgroundImage: `url(/img/faces/${user?.faces || 'default.jpg'})`,
                        }}
                    ></span>
                    <span className="ml-2 d-lg-block">
                        <span className="text-default">{user?.username}</span>
                        <small className="text-muted d-block mt-1">{ucfirst(user?.level)}</small>
                    </span>
                </a>

                {open && (
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow show">
                        <button className="dropdown-item" onClick={handleProfileClick}>
                            <i className="dropdown-icon fe fe-user"></i> Profile
                        </button>

                        <div className="dropdown-divider"></div>

                        <button className="dropdown-item" onClick={() => setShowLogout(true)}>
                            <i className="dropdown-icon fe fe-log-out"></i> Sign out
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Logout */}
            <LogoutModal
                show={showLogout}
                onClose={() => setShowLogout(false)}
                onLogout={handleLogout}
            />
        </div>
    );
};

const HeaderToggler = () => {
    const handleToggle = () => {
        const menu = document.getElementById('headerMenuCollapse');
        if (menu) {
            menu.classList.toggle('show');
        }
    };

    return (
        <a
            href="#"
            className="header-toggler d-lg-none ml-3 ml-lg-0"
            onClick={(e) => {
                e.preventDefault();
                handleToggle();
            }}
        >
            <span className="header-toggler-icon"></span>
        </a>
    );
};

function AdmHeader({ isLoggedIn, setIsLoggedIn }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Mendapatkan user aktif dari sesi
        const fetchUser = async () => {
            try {
                const response = await api.get('/api/user');
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                window.location.href = "/login";
                console.log('Not authenticated');
            }
        };

        fetchUser();
    }, [isLoggedIn]);

    return (
        <>
            <div className="header py-4" >
                <div className="container">
                    <div className="d-flex ">
                        <a className="align-items-center header-brand row" href="./index.html">
                            <img src={logo} className="header-brand-img" alt="tabler logo" />
                        </a>
                        <div className="ml-2 row flex-column ">
                            <h5 style={{ lineHeight: '10px' }}>{import.meta.env.VITE_APP_DESCRIPTION}</h5>
                            <h6 style={{ lineHeight: '0px' }} className='text-muted'>{import.meta.env.VITE_APP_NAME}</h6>
                        </div>
                        <UserAvatarDropdown user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                        <HeaderToggler />
                    </div>
                </div>
            </div>
            <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg order-lg-first">
                            <ul className="nav nav-tabs border-0 flex-column flex-lg-row">

                                {/* Regular Link */}
                                <NavbarItem path="/admin/dashboard" label="Home" ico="home" />
                                <NavbarItem path="/admin/fasilitas" label="Fasilitas" ico="box" />


                                <NavbarItem path="/" label="Main Page" ico="chrome" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdmHeader;
