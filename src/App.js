import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDash/AdminDashboard';
import StaffDashboard from './Pages/StaffDash/StaffDashboard';
import UserDashboard from './Pages/UserDash/UserDashboard';
import RegisterInfo from './Pages/AdminDash/RegisterInfo';
import AssignProject from './Pages/AdminDash/AssignProject';
import Register from './Pages/Register';
import NoPage from './Pages/NoPage';
import Main from './Pages/Main';
import { UserProvider } from './UserContext';
import './styles.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="staff" element={<StaffDashboard />} />
            <Route path="user" element={<UserDashboard />} />
            <Route path="registerinfo" element={<RegisterInfo />} />
            <Route path="assignproject" element={<AssignProject />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
