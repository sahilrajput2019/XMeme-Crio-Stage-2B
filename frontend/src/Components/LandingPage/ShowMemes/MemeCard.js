import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

import "./MemeCard.css";

const MemeCard = ({ id, name, caption, url, memes, setMemes }) => {
  const [newCaption, setNewCaption] = useState(caption);
  const [newUrl, setNewUrl] = useState(url);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/memes/" + id)
      .catch((err) => console.log(err));

    const newMemes = memes.filter((m) => m.id !== id);
    setMemes(newMemes);
    toast.success("Deleted Successfully");
  };

  const handleEdit = (id) => {
    
    axios
      .patch("http://localhost:8081/memes/" + id, {
        caption : newCaption,
        url : newUrl
      })
      .then((res) => {
        if(res.status === 200){
          toast.success("Edited Successfully");
        }
      })
      .catch((err) => console.log(err));
    
  };

  return (
    <div>
      <ToastContainer />
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
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleShow}
          >
            Edit
          </button>
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
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="New Caption"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Meme URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="New URL"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleEdit(id)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
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
