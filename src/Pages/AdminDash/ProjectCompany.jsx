import React, { useEffect, useState } from 'react';
import PostService from '../../services/http-services';
import { Modal, Button } from 'react-bootstrap';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch companies
 
    const ListCompanies = async () => {
      const sid = sessionStorage.getItem('sid');
      const data = new FormData();
      data.append('sid', sid);

      try {
        const response = await PostService.post('copall', data);
        setCompanies(response.data);
      } catch (err) {
        setError('Failed to fetch companies');
      }
    };

    const fetchProjects = async () => {
        const sid = sessionStorage.getItem('sid');
        const data = new FormData();
        data.append('sid', sid);
  
        try {
          const response = await PostService.post('projall', data);
          setProjects(response.data);
        } catch (err) {
          setError('Failed to fetch projects');
        }
      };
  
      fetchProjects();
      ListCompanies();


  // Handle project assignment
  const handleAssignProject = async () => {
    const sid = sessionStorage.getItem('sid');

    if (!sid || !selectedProject || !selectedCompany) {
      setError('All fields are required.');
      setSuccessMessage('');
      return;
    }

    const data = new FormData();
    data.append('sid', sid);
    data.append('projectCode', selectedProject);
    data.append('cid', selectedCompany);

    try {
     const response = await PostService.post('projassigncom', data);
      setSuccessMessage('Project assigned successfully!', response.data);
      setError(null);
      setShowModal(false);
    } catch (err) {
      setError('Failed to assign project');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Assign Project to a Company</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Company Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={company.cid}>
              <th scope="row">{index + 1}</th>
              <td>{company.companyName}</td>
              <td>
                <Button
                  variant="btn btn-info text-light"
                  onClick={() => {
                    setSelectedCompany(company.cid);
                    setShowModal(true);
                  }}
                >
                  Assign Project
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="project">Select Project:</label>
            <select
          id="project"
          name="project"
          className="form-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.projectCode} value={project.projectCode}>
              {project.projectName}
            </option>
          ))}
        </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="btn btn-info text-light " onClick={handleAssignProject}>
            Assign Project
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyList;
