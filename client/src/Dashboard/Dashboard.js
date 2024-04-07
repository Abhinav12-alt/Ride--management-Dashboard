
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {  Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

function Dashboard() {
    // const [isActive, setIsActive] = useState(false);

    // const handleCheckboxChange = (e) => {
    //   setIsActive(e.target.checked);
    // };
    
        const [verified, setVerified] = useState(false);
      
        const handleVerify = async (issueId) => {
          try {
            const response = await axios.post(`http://localhost:3001/api/issues/${issueId}/verify`, { verified: !verified });
            setVerified(response.data.verified);
          } catch (error) {
            console.error('Error verifying issue:', error);
          }
        };

    const handleRoleChange = async (userid, role) => {

        console.log({ userid, role });

        try {
            await axios.post(`http://localhost:3001/change_role/${userid}/${role}`);
            alert('Role changed successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to change role');
        }
    };
    // modal function
    const [showModal, setShowModal] = useState(false);

    const handleRoleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRoleSelection = (role) => {
        // Handle role selection logic here
        console.log("Selected role:", role);
        // Close the modal
        setShowModal(false);
    };
    // User section
    const [state, setstate] = useState(0)
    const [employee, setemployee] = useState([])


    const getuser = () => {
        axios.post("http://localhost:3001/getuser").then((res) => {
            console.log(res.data);
            setemployee(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    // delete issue
    const deleteissue=(delet)=>{
        axios.post(`http://localhost:3001/deleteissue/${delet}`).then((res)=>{
            console.log(res.data);
            getissues()
        }).catch((err)=>{
            console.log(err);
        })
    }
    //    delete ride
    const deletride = (dele) => {
        axios.post(`http://localhost:3001/delete/${dele}`).then((res) => {
            console.log(res.data);
            getrider()
        }).catch((err) => {
            console.log(err);

        })
    }

    useEffect(() => {
        getuser()

    }, [])
    // delete user
    const deleteuser = (del) => {
        console.log(del);
        axios.post(`http://localhost:3001/deleteuser/${del}`).then((res) => {
            console.log(res.data);
            getuser()
        }).catch((err) => {
            console.log(err);
        })
    }
    //   Ride section 

    const [ridename, setridename] = useState("");
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("")

    // multer function adding on ride section

    const addride = () => {
        console.log({ ridename, description, image });
        const formData = new FormData()
        formData.append("ridename", ridename)
        formData.append("description", description)
        formData.append("file", image)
        axios.post("http://localhost:3001/addrider", formData).then((res) => {
            console.log(res);
            getrider()
        }).catch(err => {
            console.log(err);
        })
    }
    const [issues, setissues] = useState([])
    const getissues = () => {
        axios.post("http://localhost:3001/getissues").then((res) => {
            console.log(res.data);
            setissues(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const [rides, setrides] = useState([])
    const getrider = () => {
        axios.post("http://localhost:3001/getride").then((res) => {
            console.log(res.data);
            setrides(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getrider()
        getissues()
    }, [])

    console.log(issues);


    return (
        <div className='header'>
            <div class="admin-panel clearfix">
                <div class="slidebar">
                    <div class="logo">
                        <a ></a>
                    </div>
                    <ul className='all'>

                        <a id="aa" onClick={() => setstate(0)} ><b>Users</b></a>
                        <a id="aa" onClick={() => setstate(1)} ><b id="tech">Technicians</b></a>
                        <a id="aa" onClick={() => setstate(2)}> <b>Rides</b></a>
                        <a id="aa" onClick={() => setstate(3)}><b>issues</b></a>

                    </ul>
                </div>
                <div class="main">

                    {
                        state == 0 &&

                        <div className='user'>
                            <div className='user'>
                                <Table striped bordered hover style={{ width: '150px', height: '100px' }}>
                                    <thead>
                                        <tr>

                                            <th className='text-center'> Name</th>
                                            <th className='text-center'>Email</th>
                                            <th className='text-center'>contact</th>
                                            <th className='text-center'>Image</th>
                                            <th className='text-center'>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employee[0] && employee.map((ele, index) =>

                                            <tr key={index} >
                                                <td className='text-center align-middle'>{ele.name}</td>
                                                <td className='text-center align-middle'>{ele.email}</td>
                                                <td className='text-center align-middle'>{ele.mobile}</td>
                                                <td className="text-center align-middle"><img id="userimg" src={`http://localhost:3001/${ele.img}`} /></td>
                                                <td className='text-center align-middle'>{ele.role}</td>

                                                <div className='split'><Button id="userdel0" variant="primary" onClick={handleRoleButtonClick}>Role</Button>
                                                    <Modal className='modal' show={showModal} onHide={handleCloseModal}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Select Role</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Button id="userdel" variant="primary" onClick={() => handleRoleChange(ele._id, "user")}>User</Button>
                                                            <Button id="userdel" variant="primary" onClick={() => handleRoleChange(ele._id, "technician")}>Technician</Button>
                                                            <Button id="userdel" variant="danger" onClick={() => handleRoleChange(ele._id, "admin")}>Admin</Button>

                                                        </Modal.Body>
                                                    </Modal>


                                                    <Button id="userdel" variant="danger" onClick={() => deleteuser(ele._id)}>Delete</Button>

                                                </div>

                                            </tr>

                                        )}

                                    </tbody>

                                </Table>
                            </div>
                        </div>
                    }
                    {
                        state == 1 &&

                        <div className='technician'>
                            <Table  striped bordered hover>
                                <thead>
                                    <tr className='tr'>

                                        <th className='text-center'>Name</th>
                                        <th className='text-center'>email</th>
                                        <th className='text-center'>Contact</th>
                                        <th className='text-center'>image</th>
                                        <th className='text-center'>Role</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {employee[0] && employee.map((ele, index) =>
                                        ele.role == "technician" &&
                                        <tr key={index} >
                                            <td className='text-center align-middle'>{ele.name}</td>
                                            <td className='text-center align-middle'>{ele.email}</td>
                                            <td className='text-center align-middle'>{ele.mobile}</td>
                                            <td className="text-center align-middle"><img id="userimg" src={`http://localhost:3001/${ele.img}`} /></td>
                                            <td className='text-center align-middle'>{ele.role}</td>
                                            <Button id="techdel" variant="danger" onClick={() => deleteuser(ele._id)}>Delete</Button>
                                            
                                        </tr>
                                        
                                    )}
                                    
                                </tbody>

                            </Table>

                        </div>
                    }
                    {
                        state == 2 &&
                        //   ride section
                        <div className='ridehead'>
                            <div className='ride'>
                                <div className='float'>
                                    <Form id="forum"  >
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Ride name</Form.Label>
                                            <Form.Control type="text" placeholder="" onChange={(r) => setridename(r.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={(r) => setdescription(r.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGroupPassword">
                                            <Form.Label>Ride image</Form.Label>
                                            <Form.Control type="file" placeholder="" onChange={(r) => setimage(r.target.files[0])} />
                                        </Form.Group>
                                        <Button id="butt" onClick={addride} className="btn btn-primary">Addrider</Button>
                                    </Form>

                                </div>
                                <div className=' mb-4 row'>
  {rides.map((ele, index) => (
    <div key={index} className='col-md-5 mb-3'>
      <div className='card h-100 text-center p-4'>
        <img 
          className='card-img-top img-fluid' 
          src={`http://localhost:3001/${ele.image}`} 
          alt='Ride' 
          style={{ height: "200px", objectFit: 'cover' }}  
        />
        <div className='card-body'>
          <h5 className='card-title mb-4'>{ele.ridename}</h5>
          <p className='card-text'>{ele.description}</p>
          <Button variant='danger' onClick={() => deletride(ele._id)}>Delete</Button>
        </div>
      </div>
    </div>
  ))}
</div>



                               </div> 
                            </div>
                        
                    }
                    {
                        state == 3 &&

                        <div className='row m-0 '>
                        {issues.map((ele, index) => (
                          <div key={index} className='col mb-4'>
                            <div className='card h-100 text-center p-4'>
                             
                              <div className='card-body'>
                                <h5>Title
                              <h5 className='card-title mb-4'>{ele.title}</h5>
                              </h5>
                              <h5>Ride name
                                <h5 className='card-title mb-4'>{ele.ridename}</h5></h5>
                                <h5>Description
                                <p className='card-text'>{ele.description}</p></h5>
                                <h5>Time and Date
                                <h6>{ele.date}</h6></h5>
                                <Button variant='danger' onClick={() => deleteissue(ele._id)}>Delete</Button>
                                <div>
      <Button onClick={()=>handleVerify(ele._id)} > 
      <label>{ele.verified?"Verified":"Not Verified"}</label></Button>
    </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    }


                </div>
            </div>
        </div >
    )
}

export default Dashboard