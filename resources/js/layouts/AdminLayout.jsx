import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdmHeader from './components/AdmHeader';
import Preloader from '../components/Preloader';

const AdminLayout = ({ isLoggedIn, setIsLoggedIn }) => {
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

  return (
    <div className="page">
      <div className="page-main">
        <AdmHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {loading ? <Preloader /> : <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;
