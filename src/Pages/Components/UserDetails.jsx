import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostService from '../../services/http-services';

const UserDetailsModal = ({ show, handleClose, uid }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (uid) {
        const sid = sessionStorage.getItem('sid');
        const data = new FormData();
        data.append('sid', sid);
        data.append('uid', uid);

        try {
          const response = await PostService.post('users', data);
          setUser(response.data);
        } catch (err) {
          setError('Error fetching user details');
        }
      }
    };

    fetchUserDetails();
  }, [uid]);

  if (error) return <div>{error}</div>;
  if (!user) return <div></div>;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th>User ID</th>
              <td>{user[0].uid}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user[0].fname}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user[0].email}</td>
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

export default UserDetailsModal;
