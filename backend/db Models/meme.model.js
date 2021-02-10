const mongoose = require("mongoose");

const memesSchema = mongoose.Schema(
  {
    // id: {
    //   type: String,
    // },
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
  },
  { timestamps: true }
);

const Memes = mongoose.model("Memes", memesSchema);
module.exports = Memes;
