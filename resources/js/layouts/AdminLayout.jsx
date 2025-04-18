// src/layouts/AdminLayout.js
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdmHeader from './components/AdmHeader';
import Sidebar from './components/Sidebar';

const AdminLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  
  useEffect(() => {
    import('./css/admin.css'); // Dynamically load admin.css
  }, []);

  return (
    <>
    <div className="page">
      <div className="page-main">
          <AdmHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
