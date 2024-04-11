import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink,  useNavigate } from "react-router-dom";
import axios from 'axios';

// LogoutButton component for handling logout
const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <Button id="butt1" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Logout</Button>
  );
};

function Banner() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const token = localStorage.getItem("jwt");

  const handleLoginClick = () => {
    navigate("/login");
    setExpanded(false);
  };

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
                  <NavLink id="nav" to="/home" onClick={() => setExpanded(false)}>Home</NavLink>
                  <NavLink id="nav" to="/rides" onClick={() => setExpanded(false)}>Rides</NavLink>
                  <NavLink id="nav" to="/contact" onClick={() => setExpanded(false)}>Contact</NavLink>
                </div>
              </Nav>
              <div className='but'>
                {
                  token ? (
                    <>
                    <Button id="butt1" onClick={() => {setExpanded(false); navigate('/profile')}}>
  <i class="fa-solid fa-user"></i>Profile
</Button>

                      <LogoutButton />
                    </>
                  ) : (
                    <Button id="butt1" onClick={handleLoginClick}><i class="fa-solid fa-right-to-bracket"></i>   Login</Button>
                  )
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
