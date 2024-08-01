import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostService from '../../services/http-services';

const ProjectRegistration = () => {
  const [formData, setFormData] = useState({
    projectCode: '',
    projectName: '',
    projectScheme: '',
    pps: '',
    fgaTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const sid = sessionStorage.getItem('sid');
    data.append('sid', sid);
    try {
      const response = await PostService.post('projreg', data);
      console.log('Project registered successfully', response.data);
      // Handle success (e.g., display a success message or redirect)
    } catch (error) {
      console.error('Error registering project', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Registration page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectCode" className="form-label">Project Code</label>
          <input
            type="text"
            id="projectCode"
            name="projectCode"
            className="form-control"
            value={formData.projectCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            className="form-control"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectScheme" className="form-label">Project Scheme</label>
          <input
            type="text"
            id="projectScheme"
            name="projectScheme"
            className="form-control"
            value={formData.projectScheme}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pps" className="form-label">Protection Profiles (PPS)</label>
          <select
            id="pps"
            name="pps"
            className="form-select"
            value={formData.pps}
            onChange={handleChange}
            required
          >
            <option value="">Select PPS</option>
            <option value="NDcPP">NDcPP</option>
            <option value="OSPP">OSPP</option>
            <option value="APP_PP">APP_PP</option>
            <option value="MAIL_PP">MAIL_PP</option>
            <option value="MDM_PP">MDM_PP</option>
            <option value="BIO_PP">BIO_PP</option>
            <option value="BT_PP">BT_PP</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fgaTime" className="form-label">FGA Time</label>
          <input
            type="text"
            id="fgaTime"
            name="fgaTime"
            className="form-control"
            value={formData.fgaTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-info text-light">Register</button>
      </form>
    </div>
  );
};

export default ProjectRegistration;
