import React, { useState } from 'react';
import AlertCompo from './Components/AlertCompo';
import PostService from '../services/http-services';
import logo from './Assets/img/logo.png';

const Register = () => {
  const [pass, setPass] = useState({ pass: '', passrepeat: '' });
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');

  const alertDismisFun = (val) => {
    setAlertFlag((prevVal) => ({ ...prevVal, alertDis: val }));
  };

  const [alertFlag, setAlertFlag] = useState({ alertDis: 'none', alertDismis: alertDismisFun });
  const [alert, setAlert] = useState({ title: 'Error', content: "Password doesn't match.", color: 'danger' }); //send an error if the password doesn't match 

  const submitHandler = async (e) => {
    e.preventDefault();
    if (pass.pass === pass.passrepeat) {
      const form = new FormData(e.target)
      form.append("companyName", e.target.companyName.value); //add data to a formData object to send data to the form
      try {
        const response = await PostService.post('reg', form); // send the HTTP POST request 
        setAlert({ title: 'Success', content: 'You have been registered', color: 'success' });
        alertDismisFun('block');
      } catch (err) {
        setAlert({ title: 'Error', content: err.response?.data || 'An unexpected error occurred.', color: 'danger' }); //send an alert if the response can not connect with the server.
        alertDismisFun('block');
      }
    } else {
      setAlert({ title: 'Error', content: "Password doesn't match.", color: 'danger' });
      alertDismisFun('block');
    }
  };

  const inputHandler = (e) => {
    setPass((prevPass) => ({ ...prevPass, [e.target.name]: e.target.value }));
  };

  // Const for user, staff roles
  const roleChangeHandler = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    if (selectedRole === 'Staff') {
      setCompanyName('Staff');
    } else {
      setCompanyName('');
    }
  };

  return (
//Register form design
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="col-md-3 border-none p-3 mb-5 bg-info bg-opacity-10 rounded shadow-lg">
        <form onSubmit={submitHandler}>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <img src={logo} alt="logo" width="60" height="60" />
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="fname"
                className="form-control bg-info bg-opacity-10 border-info rounded-pill"
                placeholder="First Name"
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="lname"
                className="form-control bg-info bg-opacity-10 border-info rounded-pill"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="(123) 345-7890"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="companyName"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="Company Name"
              value={companyName}
              disabled={role === 'Staff'} //disabled if the company role is staff or admin
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="pass"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="Password"
              required
              value={pass.pass}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="passrepeat"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              placeholder="Confirm Password"
              required
              value={pass.passrepeat}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <select
              name="role"
              className="form-control bg-info bg-opacity-10 border-info rounded-pill"
              required
              onChange={roleChangeHandler} //select the role of user type
            >
              <option value="">Select User Type</option>
              <option value="Client">Client</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-info text-light position-relative rounded-pill"
            style={{ width: '100%' }}
          >
            Register
          </button>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <span>Already have an account? </span>
            <a href="/" className="text-info ms-1" style={{ textDecoration: 'none' }}>
              Login
            </a>
          </div>
        </form>
        <AlertCompo alert={alert} alertFlag={alertFlag} /> 
      </div>
    </div>
  );
};

export default Register;
