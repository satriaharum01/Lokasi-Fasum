// src/layouts/PublicLayout.js
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Preloader from '../components/Preloader';
import Aside from './components/Aside';

const PublicLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Trigger loading setiap route berubah
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // waktu loading-nya bisa diatur sesuai selera

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    import('./css/public.css'); // Dynamically load admin.css
  }, []);


  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Aside />
      {loading ? <Preloader /> : <Outlet />}
    </>
  );
};

export default PublicLayout;
