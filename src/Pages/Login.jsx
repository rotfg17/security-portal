import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../services/http-services';
import logo from '../Pages/Assets/img/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useUser } from '../UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [user, setUserState] = useState({ email: '', pass: '', role: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target); // Add data to a FormData object

    try {
      const response = await PostService.post('login', form); // Send POST request
      sessionStorage.setItem('sid',response.data);
      // Use the context login function
      login({ ...user, ...response.data });

      // Redirect based on user role
      if (user.role === 'a') {
        navigate('/main/admin');
      } else if (user.role === 's') {
        navigate('/main/staff'); 
      } else {
        navigate('/main/user');
      } 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevUser) => ({ ...prevUser, [name]: value }));
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
              <option value="a">Admin</option>
              <option value="s">Staff</option>
              <option value="c">Client</option>
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
