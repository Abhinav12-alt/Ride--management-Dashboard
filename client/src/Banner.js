import React, { useState } from 'react';
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
  const [expanded, setExpanded] = useState(false); // State to manage Navbar collapse

  const toggleNavbar = () => {
    setExpanded(!expanded); // Toggle the Navbar collapse state
  };

  const token = localStorage.getItem("jwt")

  return (
    <div className='headerr'>
      <div className='bbr'>
        <Navbar expand="lg" className="navbar navbar-expand-lg navbar-light bg-light fixed-top" expanded={expanded}>
          <Container fluid>
            <NavLink className="navbar-brand fw-bold fs-4" to="/" onClick={() => setExpanded(false)}><h1 id="title"><i>Ride Management</i></h1> </NavLink>
            <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleNavbar} />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '250px' }}
                navbarScroll
              >
                <div className='banner'>
                  <NavLink id="nav" to="/" onClick={() => setExpanded(false)}>Home</NavLink>

                  <NavLink id="nav" to="/about" onClick={() => setExpanded(false)}>About</NavLink>
                  <NavLink id="nav" to="/contact" onClick={() => setExpanded(false)}>Contact</NavLink>
                </div>
              </Nav>
              <div className='but'>
                {
                  token ?

                    <LogoutButton />
                    :
                    <NavLink to="/login" onClick={() => setExpanded(false)}><Button id="butt1"><i class="fa-solid fa-right-to-bracket"></i>   Login</Button></NavLink>
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
