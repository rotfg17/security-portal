
import React from 'react';
import { useUser } from '../../UserContext';

const AdminDashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user ? user.displayInfo() : ''}</p>
      
    </div>
  );
};

export default AdminDashboard;
