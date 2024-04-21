import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const { data } = response;
      if (data.msg === "Success") {
        localStorage.setItem("jwt", data.token);
        if (data.role === "admin") {
          navigate('/dashboard');
        } else if (data.role === "technician") {
          navigate("/technicians");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='boddy'>
      <form id="form1" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 id="log1">Login</h2>
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="input-group-append">
            <span id="span" onClick={togglePasswordVisibility}>
              <i className={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </span>
          </div>
        </div>
        <button id="butt4" type="submit" className="btn btn-primary">Login</button>
      </form>
      <div>
        <p id="pp">Don't have an account? <Link to="/register">Signup</Link></p>
      </div>
    </div>
  );
}

export default Login;
