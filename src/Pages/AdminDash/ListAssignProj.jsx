import React, { useState, useEffect } from 'react';
import PostService from '../../services/http-services';
import ProjectDetailsModal from '../Components/ProjectDetailsModal';
import UserDetailsModal from '../Components/UserDetails';

const AssignedProjects = ({ userId }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedProjectCode, setSelectedProjectCode] = useState(null);
  const [selectedUid, setSelectedUid] = useState(null);

 
    const fetchProjects = async () => {
      const sid = sessionStorage.getItem('sid');
      const data = new FormData();
      data.append('sid', sid);

      if (userId) {
        data.append('uid', userId);
      }

      try {
        const response = await PostService.post('projassignall', data);
        setProjects(response.data);
      } catch (err) {
        setError('Error fetching projects');
      }
    };

    fetchProjects();


  const handleProjectClick = (projectCode) => {
    setSelectedProjectCode(projectCode);
    setShowProjectModal(true);
  };

  const handleUserClick = (uid) => {
    setSelectedUid(uid);
    setShowUserModal(true);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Assigned Projects</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Project Code</th>
            <th>Project Name</th>
            <th>Project Scheme</th>
            <th>PPS</th>
            <th>FGA Time</th>
            <th>Project Details</th>
            <th>User Details</th>
          </tr>
        </thead>
        <tbody>
        {projects.map((project, index) => (
    <tr key={`${project.projectCode}-${index}`}>
      <td>{project.projectCode}</td>
      <td>{project.projectName}</td>
      <td>{project.projectScheme}</td>
      <td>{project.pps}</td>
      <td>{project.fgaTime}</td>
      <td>
        <button className="btn btn-info text-light" style={{ width: '140px' }} onClick={() => handleProjectClick(project.projectCode)}>View Project</button>
      </td>
      <td>
        <button className="btn btn-danger text-light" style={{ width: '140px' }} onClick={() => handleUserClick(project.uid)}>View User</button>
      </td>
    </tr>
  ))}
        </tbody>
      </table>

      <ProjectDetailsModal
        show={showProjectModal}
        handleClose={() => setShowProjectModal(false)}
        projectCode={selectedProjectCode}
      />

      <UserDetailsModal
        show={showUserModal}
        handleClose={() => setShowUserModal(false)}
        uid={selectedUid}
      />
    </div>
  );
};

export default AssignedProjects;
