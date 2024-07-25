import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();


  return (
    <div className="d-flex">
      <nav className="sidebar bg-light">
        <h2>Dashboard</h2>
        <ul>
        <li>
            <Link to="admin">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="staff">Staff Dashboard</Link>
          </li>
          <li>
            <Link to="user">User Dashboard</Link>
          </li>
          <li>
            <Link to="registerinfo">Register Information</Link>
          </li>
          <li>
            <Link to="assignproject">Project Assign</Link>
          </li>
        </ul>
        
        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <button className="btn btn-info text-light position-relative rounded-pill"style={{ width: '140vh' }}>
          Log Out
        </button>
        </div>
      </nav>
      <div className="main-content p-3" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        {/* <h1>Main Page</h1> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
