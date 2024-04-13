import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Technicians.css';

function Technicians() {
  // date and time function
  const [dateTime, setDateTime] = useState('');

  // Function to handle changes in the date and time inputs
  const handleDateTimeChange = (e) => {
      const datetimeValue = e.target.value;
      setDateTime(datetimeValue);
  };

  // Get the current date and time in the format suitable for input type="datetime-local"
  const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      return currentDateTime;
  };

  // Set initial date and time value to current date and time
  useState(() => {
      const initialDateTime = getCurrentDateTime();
      setDateTime(initialDateTime);
  }, []);
  // issues
  const [ridename, setRideName] = useState("");
  const [description, setDescription] = useState("");



  const addIssue = () => {
    const currentDate = getCurrentDateTime();
      console.log({ ridename, description,date:currentDate });
      axios.post("http://localhost:3001/issues/:idride", { ridename, description,date:currentDate })
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
              <div className='card h-70 text-center p-4 card shadow'>
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
                        <Form.Control type="datetime-local"  value={dateTime}  onChange={handleDateTimeChange} />
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
