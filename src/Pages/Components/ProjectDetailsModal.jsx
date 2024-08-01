
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostService from '../../services/http-services';

const ProjectDetailsModal = ({ show, handleClose, projectCode }) => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (projectCode) { 
        const sid = sessionStorage.getItem('sid');
        const data = new FormData();
        data.append('sid', sid);
        data.append('projectCode', projectCode);

        try {
          const response = await PostService.post('projall', data);
          setProject(response.data);
        } catch (err) {
          setError('Error fetching project details');
        }
      }
    };

    fetchProjectDetails();
  }, [projectCode]);

  if (error) return <div>{error}</div>;
  if (!project) return <div></div>;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th>Project Code</th>
              <td>{project[0].projectCode}</td>
            </tr>
            <tr>
              <th>Project Name</th>
              <td>{project[0].projectName}</td>
            </tr>
            <tr>
              <th>Project Scheme</th>
              <td>{project[0].projectScheme}</td>
            </tr>
            <tr>
              <th>PPS</th>
              <td>{project[0].pps}</td>
            </tr>
            <tr>
              <th>FGA Time</th>
              <td>{project[0].fgaTime}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectDetailsModal;
