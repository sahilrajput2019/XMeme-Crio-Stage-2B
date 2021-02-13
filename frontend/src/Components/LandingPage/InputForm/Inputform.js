//Importing modules
import React, { useState } from "react";
import isImageUrl from "is-image-url"; //for checking if image url actulally leads to an image
import { ToastContainer, toast } from "react-toastify"; //for toast notifications
import axios from "axios"; //API caller method

//CSS File
import "./InputForm.css";

//Component for input form
const InputForm = () => {
  //Managing state of three input feilds
  const [formData, setFormData] = useState({
    name: "",
    caption: "",
    url: "",
  });

  //destructuring values from formData state
  const { name, caption, url } = formData;

  //for updating the state
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //custom function to check or make get request
  const handleSubmit = (e) => {
    //preventing the default behaviour of html submit forms
    e.preventDefault();

    //if all of three feilds are present
    if (name && caption && url) {
      if (isImageUrl(url)) {
        setFormData({ ...formData });
        //making get request to our API
        axios
          .post("http://localhost:8081/memes", {
            name,
            caption,
            url,
          })
          .then((res) => {
            //updating our state
            setFormData({
              ...formData,
              name: "",
              caption: "",
              url: "",
            });
            //to display toast notification
            toast.success("Posted Successfully");
            if (res.status === 200) {
              window.location.reload();
            }
          })
          .catch((err) => {
            setFormData({
              ...formData,
              name: "",
              caption: "",
              url: "",
            });
            toast.error("This meme already exists with same credetials");
          });
      } else {
        //if image link is not valid
        setFormData({
          ...formData,
          name,
          caption,
          url: "",
        });
        toast.error("Please enter valid image link");
      }
    } else {
      //if all feilds are not filled
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="InputForm">
      <ToastContainer />
      {/* Preventing the default validation of html */}
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
            // calling handle change on changing
            onChange={handleChange("name")}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label>Caption</label>
          <input
            type="text"
            className="form-control"
            value={caption}
            required
            // calling handle change on changing
            onChange={handleChange("caption")}
            placeholder="Be creative with Caption"
          />
        </div>
        <div className="form-group">
          <label>Meme Url</label>
          <input
            type="text"
            className="form-control"
            value={url}
            required
            // calling handle change on changing
            onChange={handleChange("url")}
            placeholder="Enter Url of Meme here"
          />
        </div>
        <button type="submit" className="btn btn-secondary BUTTON">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
