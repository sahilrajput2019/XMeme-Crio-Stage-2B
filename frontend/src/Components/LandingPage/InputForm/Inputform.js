import React, { useState } from "react";
import isImageUrl from "is-image-url";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./InputForm.css";

const InputForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    caption: "",
    url: "",
  });

  const { name, caption, url } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && caption && url) {
      if (isImageUrl(url)) {
        setFormData({ ...formData });
        axios
          .post("http://localhost:8081/memes", {
            name,
            caption,
            url,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              caption: "",
              url: "",
            });
            toast.success("Posted Successfully");
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
        setFormData({
          ...formData,
          name,
          caption,
          url : ""
        });
        toast.error("Please enter valid image link");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
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
            onChange={handleChange("url")}
            placeholder="Enter Url of Meme here"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
