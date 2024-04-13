import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal'; // Import modal component
import { NavLink,useNavigate  } from "react-router-dom";
import axios from 'axios';
import './Banner.css'

// LogoutButton component for handling logout
const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setTimeout(() => {
      window.location.reload();
     
    }, 100);
  }

  return (
    <Button id="butt1" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</Button>
  );
};

function Banner() {
  // profile
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [img, setImg] = useState('');
const navigate=useNavigate()

  const getUser = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('JWT token not found');
      }
      const response = await axios.post("http://localhost:3001/start", { token });
      const userData = response.data;
      setName(userData.name);
      setEmail(userData.email);
      setMobile(userData.mobile);
      setRole(userData.role);
      setImg(userData.img);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUser();
    
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // State to manage modal visibility
  

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const token = localStorage.getItem("jwt");

  const handleLoginClick = () => {
    navigate("/login");
    setExpanded(false);
  };

  const handleProfileClick = () => {
    getUser()
    setShowProfileModal(true); // Open profile modal
    setExpanded(false);
  };

  const handleCloseProfileModal = () => {
    
    setShowProfileModal(false); // Close profile modal
    

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
                {token ? (
                  <>
                    <Button id="butt1" onClick={handleProfileClick}><i className="fa-solid fa-user"></i>Profile</Button>
                    <LogoutButton />
                  </>
                ) : (
                  <Button id="butt1" onClick={handleLoginClick}><i className="fa-solid fa-right-to-bracket"></i>   Login</Button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='profile-container'>
      <div>
        <img className='profileimg' src={`http://localhost:3001/${img}`} alt="User" />
      </div>
      
      <div className='profile-info'>
        
        
        <p ><b>Username</b>: {name}</p>
        <p><b>Email</b>:  {email}</p>
        <p><b>Phone</b>:  {mobile}</p>
        <p><b>Role</b>:   {role}</p>
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfileModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Banner;
