const mongoose = require("mongoose");

const memesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  caption: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Memes = mongoose.model("Memes", memesSchema);
module.exports = Memes;
