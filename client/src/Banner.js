import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests

// LogoutButton component for handling logout
const LogoutButton = () => {
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('jwt');
    window.location.reload()

    // Optionally, clear token from session storage
    // sessionStorage.removeItem('token');

  }

  return (
    <Button id="butt1" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Logout</Button>
  );
};

function Banner() {
  const token = localStorage.getItem("jwt")
  // const handleSubmit = () => {
    // });
  // }

  return (
    <div className='headerr'>
      <div className='bbr'>
        <Navbar expand="lg" className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <Container fluid>
            <NavLink className="navbar-brand fw-bold fs-4" to="/"><h1>Ride Management</h1> </NavLink>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <div className='banner'>
                  <NavLink id="nav" to="/">Home</NavLink>

                  <NavLink id="nav" to="/about">About</NavLink>
                  <NavLink id="nav" to="/contact">Contact</NavLink>
                </div>
              </Nav>
              <div className='but'>
                {
                  token ?

                    <LogoutButton />
                    :
                    <NavLink to="/login"><Button id="butt1"><i class="fa-solid fa-right-to-bracket"></i>   Login</Button></NavLink>
                }
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Banner;