import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Rides.css'

function Rides() {
  
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  const getRides = () => {
    axios.post("http://localhost:3001/getride")
      .then((res) => {
        console.log(res.data);
        setRides(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getRides();
  }, []);

  const openModal = (ride) => {
    setSelectedRide(ride);
  }

  const closeModal = () => {
    setSelectedRide(null);
  }

  

  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          {rides.map((ele, index) => (
            <div key={index} className='col-sm-12 col-md-6 col-lg-4 mb-4 ml-5'>
              <div className='card h-70 text-center p-4 card shadow'>
                <img
                  className='card-img-top img-fluid'
                  src={`http://localhost:3001/${ele.image}`}
                  alt='Ride'
                  style={{ height: "280px", objectFit: 'cover' }}
                />
                <div className='card-body'>
                  <h5 className='card-title mb-4' id="heading">Ride name</h5>
                  <h6 className='card-title mb-4'>{ele.ridename}</h6>
                  <Button id="issuedel" variant='danger' onClick={() => openModal(ele)}>View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedRide && (
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ride Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={`http://localhost:3001/${selectedRide.image}`}
              alt='Ride'
              style={{ width: '100%', height: 'auto' }}
            />
            <h5>Ride name</h5><br></br><p>{selectedRide.ridename}</p> 
            <h5>Description </h5><br></br><p>{selectedRide.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
           
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Rides;
