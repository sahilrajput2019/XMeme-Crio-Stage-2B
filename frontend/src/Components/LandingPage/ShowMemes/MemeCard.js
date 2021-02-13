//importing modules
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";  //imporing components from Bootstarp

//CSS File
import "./MemeCard.css";

//MemeCard Component
const MemeCard = ({ id, name, caption, url, memes, setMemes }) => {

  //State to manage new caption and url
  const [newCaption, setNewCaption] = useState(caption);
  const [newUrl, setNewUrl] = useState(url);

  //state for hiding and showing of modals
  const [show, setShow] = useState(false);

  //handler functions for modals state management 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //delete functionality function
  const handleDelete = (id) => {
    //delete request for that specific id
    axios
      .delete("http://localhost:8081/memes/" + id)
      .catch((err) => console.log(err));

    //copying that array except the deleted value
    const newMemes = memes.filter((m) => m.id !== id);

    //updating the parent component State
    setMemes(newMemes);
    toast.success("Deleted Successfully");  //toast notification
  };

  //edit functionality function
  const handleEdit = (id) => {
    //patch requst to our api
    axios
      .patch("http://localhost:8081/memes/" + id, {
        caption : newCaption,
        url : newUrl
      })
      .then((res) => {
        toast.success("Edited Successfully");
        if(res.status === 200){
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
    
  };

  return (
    <div>
      <ToastContainer />
      {/* setting up card height and width */}
      <div className="card " style={{ width: "15rem", height: "22rem" }}>
        <img
          className="card-img-top"
          style={{ height: "13rem" }}
          src={url}
          alt="Meme"
        />
        <div className="card-body">
          <h5 className="card-title">Via - {name}</h5>
          <p className="card-text">{caption}</p>
        </div>
        <div>
        {/* Button to trigger Modal */}
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleShow}
          >
            Edit
          </button>
          {/* Responsive Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>New Caption</Form.Label>
                <Form.Control
                  type="text"
                  value={newCaption}
                  // on changing the value update the state
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="New Caption"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Meme URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newUrl}
                  // on changing the value update the state
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="New URL"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* Button to triggger patch request vai handleEdit function */}
              <Button variant="success" onClick={() => handleEdit(id)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Button for delete Functionality */}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;
