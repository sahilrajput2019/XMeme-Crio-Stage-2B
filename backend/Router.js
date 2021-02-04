const express = require("express");
const router = express.Router();

router.get("/memes", (req, res) => {
  res.send("Here goes all your memes");
});

module.exports = router;
