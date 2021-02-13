//importing modules
import React, { useState, useEffect } from "react";
import axios from "axios";
//importing MemeCard Component
import MemeCard from "./MemeCard";

//CSS File
import "./ShowMemes.css";

//ShoeMemes Component
const ShowMemes = () => {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);

  //On component render
  useEffect(() => {
    // making a get request to our api
    axios
      .get("http://localhost:8081/memes")
      .then((response) => setMemes(response.data)) //setting up state
      .catch((error) => setError(error));
  }, []);

  //if error
  if (error) {
    return <div className="loader"></div>;
  } else if (memes.length === 0) {       //if no memes present in the database
    return (
      <div>
        <center>No memes to display please add more</center>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="showMemes">
      <center>
        <h1>Enjoy Memes</h1>
      </center>
      <hr></hr>
      <div className="row row-cols-2 row-cols-xs-12 row-col-sm-12 row-cols-lg-3">
        {memes.map((meme, key) => (
          <div className="col-12 col-sm-6 col-lg-3" key={meme.id}>
            {/* Rendring MemeCard component on each meme value */}
            <MemeCard
              id={meme.id}
              name={meme.name}
              caption={meme.caption}
              url={meme.url}
              memes={memes}
              setMemes={setMemes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowMemes;
