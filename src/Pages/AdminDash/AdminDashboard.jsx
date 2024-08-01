import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      {/* <h1>Admin Dashboard</h1> */}
      <nav>
        <ul className='links'>
          <li>
            <Link to="registerinfo">Register Information</Link>
          </li>
          <li>
            <Link to="assignproject">Assign Project</Link>
          </li>
          <li>
            <Link to="listassignproj">List Assigned Projects</Link>
          </li>
          <li>
            <Link to="companyreg">Company Registration</Link>
          </li>
          <li>
            <Link to="projectcompany">Project Company</Link>
          </li>
          <li>
            <Link to="userregistration">User Registration</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
