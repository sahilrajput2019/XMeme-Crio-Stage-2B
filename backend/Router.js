const express = require("express");
const router = express.Router();
const Memes = require("./db Models/meme.model"); //requring memes model

//Default route to send memes (only 100 and sorted)
//sort them on the basis of oldest to new and keeping the limit to only 100
//then returning the json array of objects of these memes and checking for error by catch
router.get("/memes", (req, res) => {
  Memes.find({})
    .sort({ _id: -1 })
    .limit(100)
    .then((memes) => {
      //we need to have modified output i.e _id should be returned as id and and lesser feilds
      //we also dont need to send extra feilds which mongodb provides like version key
      const updatedMemesArray = memes.map((meme) => {
        return {
          id: meme._id,
          name: meme.name,
          url: meme.url,
          caption: meme.caption,
        };
      });
      res.status(200).json(updatedMemesArray);
    })
    .catch((err) => res.status(404).json({ message: err }));
});

//To send a particular meme based on the id sent in the params and returning that as an object
router.get("/memes/:id", (req, res) => {
  Memes.findById(req.params.id)
    .then((meme) => {
      //As here also to match the response needed with specifier feilds
      //here modified the name of feilds in the object and returned this as an response object
      const newMeme = {
        id: meme._id,
        name: meme.name,
        url: meme.url,
        caption: meme.caption,
      };
      res.status(200).json(newMeme);
    })
    .catch((err) => res.status(404).json({ message: err }));
});

//Posting a new meme
router.post("/memes", (req, res) => {
  try {
    //Check if meme with same credentials already exists in the database
    //if yes then send status 409 else store the meme in database and return the id
    Memes.findOne({ ...req.body }).exec((err, meme) => {
      if (meme) {
        res.status(409).json();
      } else {
        const meme = new Memes({ ...req.body });
        meme.save();
        res.status(200).json({ id: meme._id });
      }
    });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//For Updating some values (allowed to update only caption and url)
router.patch("/memes/:id", (req, res) => {
  Memes.findById(req.params.id)
    .then((meme) => {
      meme.caption = req.body.caption;
      meme.url = req.body.url;
      meme
        .save()
        .then(() => res.status(200).json())
        .catch((err) => res.status(400).json({ message: err }));
    })
    .catch((err) => res.status(404).json({ message: err }));
});

//for development purpose only
router.delete("/memes/:id", (req, res) => {
  Memes.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json())
    .catch((err) => res.status(400).json({ message: err }));
});

module.exports = router;
