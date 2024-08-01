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
    const form = new FormData(e.target);

    try {
      // Enviar solicitud de inicio de sesión
      const response = await PostService.post('login', form);
      const sid = response.data;
      sessionStorage.setItem('sid', sid);

      // Obtener información adicional del usuario
      const infoData = new FormData();
      infoData.append('sid', sid);
      const infoResponse = await PostService.post('info', infoData);
      const uid = infoResponse.data.uid;

      // if (typeof uid !== 'string' && typeof uid !== 'number') {
      //   throw new Error('Invalid UID format');
      // }

      sessionStorage.setItem('uid', uid.toString());

      // Actualizar el estado del usuario con la información obtenida
      const updatedUser = { ...user, ...infoResponse.data };
      login(updatedUser);

      // Redirigir según el rol del usuario
      switch (updatedUser.role) {
        case 'a':
          navigate('/main/admin');
          break;
        case 's':
          navigate('/main/staff');
          break;
        default:
          navigate('/main/user');
          break;
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Manejar errores de inicio de sesión
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="col-md-3 border-none p-3 mb-5  bg-opacity-10 rounded shadow-lg" style={{  background: '#d6fff6'}}>
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
            <a href="/register" className="text-info ms-1" style={{ textDecoration: 'none' }}>Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
