// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminFasum from './pages/adminFasum';
import AdminFasumForm from './pages/adminFasumForm';
import Login from './pages/login';
import PrivateRoute from './utils/privateRoutes';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          {/* Rute Publik */}
          <Route element={<PublicLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            {/* Tambahkan halaman publik lain di sini */}
          </Route>

          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* Admin Routes */}
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route element={<AdminLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/fasilitas" element={<AdminFasum />} />
              <Route path="/admin/fasilitas/new" element={<AdminFasumForm type="new" />} />
              <Route path="/admin/fasilitas/edit/:id" element={<AdminFasumForm type="edit" />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
