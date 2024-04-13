import React from 'react'


import { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login() {
      // password showing
      const [passwordVisible, setPasswordVisible] = useState(false);
    
  
      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
  
   
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result=>{
          console.log(result)
          if(result.data.msg ==="Success"){
            localStorage.setItem("jwt",result.data.token)
          navigate('/home')
          }
        })
    .catch(err=>console.log(err))

    }

  return (
    <div className='boddy'>
      <form id="form1" onSubmit={handleSubmit}>
  <div class="form-group">
    <h2 id="log1">Login</h2>
  
    <label for="exampleInputEmail1">Email</label>
    <input type="email" class="form-control"  placeholder="Enter email"
    onChange={(e)=>setEmail(e.target.value)}
    ></input>
  </div>
  <div id="sd" class="form-group ">
    <label for="exampleInputPassword1">Password</label>
    <input  type={passwordVisible ? 'text' : 'password'} class="form-control"  placeholder="Password"
    onChange={(e)=>setPassword(e.target.value)}
    ></input>
                <div className="input-group-append">
        <span id="span"  onClick={togglePasswordVisibility}>
        
<i class={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>

        </span>
  </div></div>
 
  <button id="butt4"  type="submit" class="btn btn-primary">Login</button>
</form>
<div>
  <p id="pp">Dont Have an Account
  <Link to="/register">Signup</Link></p>
</div>

    
    </div>
  )
}

export default Login

