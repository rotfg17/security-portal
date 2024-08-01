import React, { useState, useEffect } from 'react';
import PostService from '../../services/http-services';

const AssignProject = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  
    const fetchProjects = async () => {
      const sid = sessionStorage.getItem('sid');
      const data = new FormData();
      data.append('sid', sid);

      try {
        const response = await PostService.post('projall', data);
        setProjects(response.data); 
        console.log('Projects fetched successfully', response.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    const fetchUsers = async () => {
      const sid = sessionStorage.getItem('sid');
      const data = new FormData();
      data.append('sid', sid);
      data.append('role', 'c'); 

      try {
        const response = await PostService.post('users', data);
        setUsers(response.data); 
        console.log('Users fetched successfully', response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchProjects();
    fetchUsers();


  const handleAssign = async () => {
    const projA = new FormData();
    projA.append('sid', sessionStorage.getItem('sid'));
    projA.append('projectCode', selectedProject);
    projA.append('uid', selectedUser);

    try {
      const response = await PostService.post('projassign', projA);
      console.log('Project assigned successfully', response.data);
    } catch (error) {
      console.error('Error assigning project', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Assign Project to User</h2>
      <div className="mb-3">
        <label htmlFor="project" className="form-label">Select Project</label>
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
      <div className="mb-3">
        <label htmlFor="user" className="form-label">Select User</label>
        <select
          id="user"
          name="user"
          className="form-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.uid} value={user.uid}>
              {user.fname}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign} className="btn btn-info text-light">
        Assign Project
      </button>
    </div>
  );
};

export default AssignProject;
