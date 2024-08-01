import React, { useEffect, useState } from 'react';
import PostService from '../../services/http-services';

const UserEdit = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch companies and users
  useEffect(() => {
    const fetchCompaniesAndUsers = async () => {
      const sid = sessionStorage.getItem('sid');
      const data = new FormData();
      data.append('sid', sid);

      try {
        // Fetch companies
        const companyResponse = await PostService.post('copall', data);
        setCompanies(companyResponse.data);

        // Fetch users
        const userResponse = await PostService.post('users', data);
        setUsers(userResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchCompaniesAndUsers();
  }, []);

  // Populate form fields with selected user details
  useEffect(() => {
    const fetchUserDetails = () => {
      if (selectedUser) {
        const user = users.find(user => user.uid === selectedUser);
        if (user) {
          setFname(user.fname || '');
          setLname(user.lname || '');
          setEmail(user.email || '');
          setRole(user.role || '');
          setPhone(user.phone || '');
          setSelectedCompany(user.cid || '');
        }
      }
    };

    fetchUserDetails();
  }, [selectedUser, users]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedCompany) {
      setError('Please select a company.');
      return;
    }

    const sid = sessionStorage.getItem('sid');
    const data = new FormData();
    data.append('sid', sid);
    data.append('uid', selectedUser);
    data.append('cid', selectedCompany);
    data.append('fname', fname);
    data.append('lname', lname);
    data.append('email', email);
    data.append('role', role);
    data.append('phone', phone);

    try {
      await PostService.post('useredit', data);
      setSuccessMessage('User updated successfully!');
      setError(null);
    } catch (err) {
      setError('Failed to update user');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="user">Select User:</label>
          <select
            id="user"
            className="form-control"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.uid} value={user.uid}>
                {user.fname} {user.lname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            className="form-control"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            className="form-control"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="a">Admin</option>
            <option value="s">Staff</option>
            <option value="c">Client</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Select Company:</label>
          <select
            id="company"
            className="form-control"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            required
          >
            <option value="">Select a Company</option>
            {companies.map((company) => (
              <option key={company.cid} value={company.cid}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-info text-light">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
