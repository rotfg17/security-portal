import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import StaffDashboard from './Pages/StaffDash/StaffDashboard';
import UserDashboard from './Pages/UserDash/UserDashboard';
import AdminDashboard from './Pages/AdminDash/AdminDashboard';
import RegisterInfo from './Pages/RegisterInfo/RegisterInfo';
import Register from './Pages/Register';
import NoPage from './Pages/NoPage';
import Main from './Pages/Main';
import './styles.css';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />}>
        <Route path="admin" element={<AdminDashboard />} />
          <Route path="staff" element={<StaffDashboard />} />
          <Route path="user" element={<UserDashboard />} />
          <Route path="registerinfo" element={<RegisterInfo />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
