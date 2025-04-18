// src/layouts/PublicLayout.js
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const PublicLayout = ({ isLoggedIn, setIsLoggedIn }) => {

  useEffect(() => {
    import('./css/public.css'); // Dynamically load admin.css
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
