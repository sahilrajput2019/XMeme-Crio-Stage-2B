// import axios from "axios";
import axios from "axios";
import React from "react";

import "./MemeCard.css";

const MemeCard = ({ id, name, caption, url, onChange }) => {
  // const handleChange = (text) => (e) => {
  //   onChange();
  // };
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(id);
    const endpoint = "http:localhost:8081/memes/" + id;
    console.log("Endpoint" + endpoint);
    axios.delete(endpoint).catch((err) => console.log(err));
  };
  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   console.log("id = " + id);
  //   const endpoint = "http://localhost:8081/memes/" + { id };
  //   console.log(endpoint);
  //   axios.patch(endpoint).catch((err) => console.log(err));
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
          <button type="submit" className="btn btn-info btn-sm">
            Edit
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModalCenter"
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
                    onChange={handleChange("caption")}
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
                    onChange={handleChange("url")}
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
              <button type="button" className="btn btn-primary">
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
