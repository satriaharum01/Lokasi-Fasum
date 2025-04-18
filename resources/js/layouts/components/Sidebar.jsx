// src/layouts/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><NavLink to="/admin">Dashboard</NavLink></li>
        <li><NavLink to="/admin/users">Users</NavLink></li>
        <li><NavLink to="/admin/settings">Settings</NavLink></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
