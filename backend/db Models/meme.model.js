const mongoose = require("mongoose");

//Schema of memes storing three values i.e name, caption and url
const memesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
    trim: true,
  },
});

const Memes = mongoose.model("Memes", memesSchema);
module.exports = Memes;
