// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../services/http-services';
import logo from './Assets/img/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { User, Staff, Admin, Client } from './clases/users'; 

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', pass: '', role: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();

    let userInstance;
    switch (user.role) {
      case 's':
        userInstance = new Staff(user.email, user.pass);
        break;
      case 'c':
        userInstance = new Client(user.email, user.pass);
        break;
      case 'a':
        userInstance = new Admin(user.email, user.pass);
        break;
      default:
        console.error('Invalid role');
        return;
    }

    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('pass', user.pass);
    formData.append('role', user.role);

    try {
      const response = await PostService.post('login', formData);
      console.log(response.data);

      setCurrentUser(userInstance); // Set the current user in App.js

      if (userInstance.role === 's') {
        navigate('/main/staff');
      } else if (userInstance.role === 'a') {
        navigate('/main/admin');
      } else {
        navigate('/main/user');
      } 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="col-md-3 border-none p-3 mb-5 bg-info bg-opacity-10 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <img src={logo} alt="logo" width="60" height="60" />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="Email Address"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="pass"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="Password"
              value={user.pass}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <select
              name="role"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              required
              onChange={handleInputChange}
            >
              <option value="">Select your Role</option>
              <option value="c">Client</option>
              <option value="s">Staff</option>
              <option value="a">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-info text-light position-relative rounded-pill" style={{ width: '100%' }}>
            Login
          </button>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <span>Don't have an account? </span>
            <a href="/register" className='text-info ms-1' style={{ textDecoration: 'none' }}>Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
