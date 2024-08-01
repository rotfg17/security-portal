import React, { useState, useEffect } from 'react';
import PostService from '../../services/http-services';

const CompanyReg = () => {
  const [companyName, setCompanyName] = useState('');
  const [managers, setManagers] = useState([]); // Estado para almacenar la lista de managers
  const [selectedManager, setSelectedManager] = useState(''); // Estado para el manager seleccionado
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Obtener la lista de usuarios al cargar el componente

    const fetchManagers = async () => {
        const sid = sessionStorage.getItem('sid');
        const userD = new FormData();
        userD.append('sid', sid);
        userD.append('role', 'c'); 
      try {
        const response = await PostService.post('users', userD); // Ajusta el endpoint y parámetros según sea necesario
        setManagers(response.data); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error fetching managers', error);
        setError('Error fetching managers');
      }
    };

    fetchManagers();

  const handleCompany = async (e) => {
    e.preventDefault();
    const sid = sessionStorage.getItem('sid');

    if (!sid || !selectedManager) {
      setError('Session ID or Manager is missing.');
      setSuccessMessage('');
      return;
    }

    const data = new FormData();
    data.append('sid', sid);
    data.append('companyname', companyName);
    data.append('uid', selectedManager);

    try {
      const response = await PostService.post('compreg', data);
      setSuccessMessage('Company registered successfully!', response.data);
      setCompanyName(''); // Clear the input field after successful registration
      setSelectedManager(''); // Clear the selected manager
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error registering company', error);
      setError('Error registering company');
      setSuccessMessage(''); // Clear any success messages
    }
  };

  return (
    <div className="container">
      <h1>Company Registration</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleCompany}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
       
        <div className="mb-3">
        <label htmlFor="user" className="form-label">Select a Manager</label>
        <select
          id="manager"
          className="form-select"
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
          required
        >
          <option value="">Select a Manager</option>
          {managers.map((manager) => (
            <option key={manager.uid} value={manager.uid}>
              {manager.fname}
            </option>
          ))}
        </select>
      </div>

        <button type="submit" className="btn btn-info text-light">
          Register Company
        </button>
      </form>
    </div>
  );
};

export default CompanyReg;
