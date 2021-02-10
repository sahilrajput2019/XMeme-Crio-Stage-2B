const express = require("express");
const router = express.Router();
const Memes = require("./db Models/meme.model"); //requring memes model

//Default route to send memes (only 100 and sorted)
router.get("/memes", (req, res) => {
  Memes.find({})
    .sort({ _id: 1 })
    .limit(100)
    .then((memes) => res.status(200).json(memes))
    .catch((err) => res.status(404).json({ message: err }));
});

//To send a particular meme
router.get("/memes/:id", (req, res) => {
  Memes.findById(req.params.id)
    .then((meme) => res.status(200).json(meme))
    .catch((err) => res.status(404).json({ message: err }));
});

//Posting a new meme
router.post("/memes", (req, res) => {
  try {
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

//For Updating some values (allowed only caption and url)
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
