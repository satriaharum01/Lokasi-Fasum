// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AdminKomik from './pages/adminKomik';
import AdminKomikForm from './pages/adminKomikForm';
import AdminGenres from './pages/adminGenres';
import AdminGenreForm from './pages/adminGenreForm';
import Login from './pages/login';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route element={<PublicLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* Tambahkan halaman publik lain di sini */}
        </Route>

        {/* Rute Admin */}
        <Route element={<AdminLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/komik" element={<AdminKomik subTitle="List Data Komik" title="Data Komik" />} />
          <Route path="/admin/komik/new" element={<AdminKomikForm subTitle="New List" title="Data Komik" type="new" />} />
          <Route path="/admin/genre" element={<AdminGenres subTitle="List Data Genre Komik" title="Data Genre Komik" />} />
          <Route path="/admin/genre/new" element={<AdminGenreForm subTitle="New List" title="Data Genre Komik" type="new" />} />
          <Route path="/admin/genre/edit/:id" element={<AdminGenreForm subTitle="Edit List" title="Edit Genre Komik" type="edit" />} />
          {/* Tambahkan halaman admin lain di sini */}
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
