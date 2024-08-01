import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';
import NoPage from './Pages/NoPage';

import AdminDashboard from './Pages/AdminDash/AdminDashboard';
import RegisterInfo from './Pages/AdminDash/RegisterInfo';
import AssignProject from './Pages/AdminDash/AssignProject';
import ListAssignProj from './Pages/AdminDash/ListAssignProj';
import CompanyReg from './Pages/AdminDash/CompanyReg';
import ProjectCompany from './Pages/AdminDash/ProjectCompany';
import UserRegistration from './Pages/AdminDash/UserRegistration';

import StaffDashboard from './Pages/StaffDash/StaffDashboard';
import UserDashboard from './Pages/UserDash/UserDashboard';

import { UserProvider } from './UserContext';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />}>
            <Route path="admin" element={<AdminDashboard />}>
              <Route path="registerinfo" element={<RegisterInfo />} />
              <Route path="assignproject" element={<AssignProject />} />
              <Route path="listassignproj" element={<ListAssignProj />} />
              <Route path="companyreg" element={<CompanyReg />} />
              <Route path="projectcompany" element={<ProjectCompany />} />
              <Route path="userregistration" element={<UserRegistration />} />
            </Route>
            <Route path="staff" element={<StaffDashboard />} />
            <Route path="user" element={<UserDashboard />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
