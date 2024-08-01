import React, { useState, useLayoutEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles.css'

const Main = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('');

  const handleNavClick = (dashboard) => {
    setSelectedDashboard(dashboard);
  };

  // Apply styles based on the selected dashboard
  useLayoutEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      if (selectedDashboard === 'admin') {
        sidebar.style.backgroundColor = '#d6fff6'; // Color for Admin Dashboard
      } else if (selectedDashboard === 'staff') {
        sidebar.style.backgroundColor = '#e7c6ff'; // Color for Staff Dashboard
      } else if (selectedDashboard === 'user') {
        sidebar.style.backgroundColor = '#b8c0ff'; // Color for User Dashboard
      } else {
        sidebar.style.backgroundColor = ''; // Default or no background
      }
    }
  }, [selectedDashboard]);

  return (
    <div className="d-flex">
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/main/admin" onClick={() => handleNavClick('admin')}>Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/main/staff" onClick={() => handleNavClick('staff')}>Staff Dashboard</Link>
          </li>
          <li>
            <Link to="/main/user" onClick={() => handleNavClick('user')}>User Dashboard</Link>
          </li>
        </ul>
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-info text-light" style={{ width: '140px' }}>Log Out</button>
        </div>
      </nav>
      <div className="main-content p-3" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
