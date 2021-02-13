import React, { useState, useEffect } from "react";
import axios from "axios";
import MemeCard from "./MemeCard";
import "./ShowMemes.css";

const ShowMemes = () => {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/memes")
      .then((response) => setMemes(response.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div className="loader"></div>;
  } else if (memes.length === 0) {
    return (
      <div>
        <center>No memes to display please add more</center>
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
