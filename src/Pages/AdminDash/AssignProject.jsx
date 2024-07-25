import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import PostService from '../../services/http-services';

const AssignProject = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        if (user) {
          // Fetch projects
          const projectsResponse = await PostService.post('projall', {
            params: { sid: JSON.parse(sessionStorage.getItem('sid')) }
          });
          setProjects(projectsResponse.data);
  
          // Fetch users based on role
          const staffResponse = await await PostService.post('users', {
            params: { sid: JSON.parse(sessionStorage.getItem('sid')), role: 's' } // 's' for Staff
          });
          setStaff(staffResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [user]);
  

  const handleAssign = () => {
    axios.post('http://192.168.0.10/fga/index.php/projassign', {
      sid: JSON.parse(sessionStorage.getItem('sid')),
      projectCode: selectedProject,
      uid: selectedUser
    })
    .then(response => {
      console.log('Project assigned successfully:', response.data);
      // Optionally, refresh the lists or show a success message
    })
    .catch(error => console.error('Error assigning project:', error));
  };

  return (
    <div className="container">
      <h2 className="my-4">Assign Project</h2>
      <div className="mb-3">
        <label htmlFor="project" className="form-label">Select Project:</label>
        <select id="project" className="form-control" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}
        >
          <option value="">Select a Project</option>
          {projects.map(project => (<option key={project.code} value={project.code}>{project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="user" className="form-label">Select User:</label>
        <select id="user" className="form-control" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}
        >
          <option value="">Select a User</option>
          {staff.map(user => ( <option key={user.id} value={user.id}> {user.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign} className="btn btn-info text-light position-relative rounded-pill">Assign Project</button>
    </div>
  );
};

export default AssignProject;
