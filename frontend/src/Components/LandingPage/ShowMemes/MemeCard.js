// import axios from "axios";
import axios from "axios";
import React, { useState } from "react";

import "./MemeCard.css";

const MemeCard = ({ id, name, caption, url, memes, setMemes }) => {
  
  // const [newCaption, setNewCaption] = useState(caption);
  // const [newUrl, setNewUrl] = useState(url);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/memes/" + id)
      .catch((err) => console.log(err));

    const newMemes = memes.filter((m) => m.id !== id);
    setMemes(newMemes);
  };

  // const handleEdit = (id) => {
  //   const updateMeme = {
  //       caption : newCaption,
  //       url : newUrl
  //   };
  //   console.log(updateMeme);
  //   axios.patch("http://localhost:8081/memes/" + id, updateMeme)
  //   .catch((err) => console.log(err));

  //   const newMeme = {
  //     id : id,
  //     name : name, 
  //     url : newUrl,
  //     caption : newCaption
  //   };
  //   setMemes([...memes, newMeme]);

  // };

  return (
    <div>
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
            data-toggle="modal"
            data-target="#Modal"
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="Modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div class="form-group">
                  <label for="caption-change" className="col-form-label">
                    Caption
                  </label>
                  <input
                    type="text"
                    id="caption-change"
                    className="form-control"
                    value={caption}
                    onChange={(e) => setNewCaption(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="url-change" class="col-form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="url-change"
                    className="form-control"
                    value={url}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleEdit(id)}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MemeCard;
