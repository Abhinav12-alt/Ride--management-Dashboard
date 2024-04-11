import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Technicians.css';

function Technicians() {
  // issues
  const [ridename, setRideName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addIssue = () => {
      console.log({ ridename, description, date });
      axios.post("http://localhost:3001/issues/:idride", { ridename, description, date })
          .then((res) => {
              console.log(res);
              // Show alert after successful addition of issue
              alert('Issue added successfully!');
          })
          .catch(err => {
              console.log(err);
          });
  }
 
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showAddIssueModal, setShowAddIssueModal] = useState(false);

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

  const addIssues = (rideId) => {
    setShowAddIssueModal(true);
  }

  const closeAddIssueModal = () => {
    setShowAddIssueModal(false);
  }

  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          {rides.map((ele, index) => (
            <div key={index} className='col-sm-12 col-md-6 col-lg-4 mb-4 ml-5'>
              <div className='card h-80 text-center p-4 card shadow'>
                <img
                  className='card-img-top img-fluid'
                  src={`http://localhost:3001/${ele.image}`}
                  alt='Ride'
                  style={{ height: "280px" ,objectFit: 'cover' }}
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
            <h5>Ride name</h5><br></br> <p>{selectedRide.ridename}</p>
            <h5>Description</h5><br></br><p> {selectedRide.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => addIssues(selectedRide._id)}>
              Add Issue
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showAddIssueModal && (
        <Modal show={true} onHide={closeAddIssueModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='float'>
                <Form id="forum">
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Ride name</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(e) => setRideName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Select date" onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>

                    <Button id="butt" onClick={addIssue} className="btn btn-primary">Add issue</Button>
                </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddIssueModal}>
              Cancel
            </Button>
            {/* Add submit button or necessary actions here */}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Technicians;
