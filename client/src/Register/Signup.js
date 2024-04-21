import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';



function Signup() {
    // password showing
    const [passwordVisible, setPasswordVisible] = useState(false);
    
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const [cpasswordVisible, setcPasswordVisible] = useState(false);
    
  
    const togglecPasswordVisibility = () => {
      setcPasswordVisible(!cpasswordVisible);
    };
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!name.trim()) {
            validationErrors.name = "Name is required";
        }

        if (!email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Email is not valid";
        }

        if (!password.trim()) {
            validationErrors.password = "Password is required";
        } else if (password.length < 6) {
            validationErrors.password = "Password should be at least 8 characters";
        }

        if (confirmPassword !== password) {
            validationErrors.confirmPassword = "Passwords  not matching";
        }

        if (!mobile.trim()) {
            validationErrors.mobile = "Mobile number is required";
        }

        if (!img) {
            validationErrors.img = "Profile picture is required";
        }

        if (Object.keys(validationErrors).length === 0) {
            // Validation passed, submit the form
            console.log({ name, email, password, mobile, img });
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("mobile", mobile);
            formData.append("file", img);
            axios.post("http://localhost:3001/register", formData).then((res) => {
                console.log(res);
                navigate('/login');
            }).catch(err => {
                console.log(err);
            });
        } else {
            // Validation failed, update errors state
            setErrors(validationErrors);
        }
    };

    const [errors, setErrors] = useState({});

    return (
        <div>
            <form className='signup' onSubmit={handleSubmit}>
                <h2 id="reg">Register</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control"
                        id="show_hide_password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <div className="input-group-append">
        <span id="span"  onClick={togglePasswordVisibility}>
        
<i class={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>

        </span>
      </div>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-container">
                    <input
                         type={cpasswordVisible ? 'text' : 'password'}
                        className="form-control"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                  
                    <div className="input-group-append">
        <span id="span"  onClick={togglecPasswordVisibility}>
         
<i class={`fas ${cpasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
        </span>
        </div>
      </div>
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    {errors.mobile && <span className="error">{errors.mobile}</span>}
                </div>
                <div className="form-group">
                    <label>Profile</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    {errors.img && <span className="error">{errors.img}</span>}
                </div>
                <button id="butt" className="btn btn-primary">Register</button>
            </form>
            <div>
                <p id="pp">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;