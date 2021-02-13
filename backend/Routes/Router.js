const express = require("express");
const router = express.Router();
const Memes = require("../db Models/meme.model"); //requring memes model

//Schema defined for Swagger Documentation

/**
 * @swagger
 * components:
 *   schemas:
 *     Meme:
 *       type: object
 *       required:
 *         - name
 *         - url
 *         - caption
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the meme
 *         name:
 *           type: string
 *           description: The onner of meme
 *         url:
 *           type: string
 *           description: The url of meme
 *         caption:
 *           type: string
 *           description: The caption of meme
 *       example:
 *         id: 6027c9d2cdebd91e4cef5f1d
 *         name: Harry
 *         url : https://i.pinimg.com/236x/d3/3b/de/d33bdeacb562645b20e6fad283880850.jpg
 *         caption: I am magician
 */

 /**
  * @swagger
  * tags:
  *   name: Memes
  *   description: The MemeStream API's
  */


//Home page route
router.get("/", (req, res) => {
  res.send("Server is Up and Running");
});

// GET Route
/**
 * @swagger
 * /memes:
 *   get:
 *     summary: Returns the list of latest 100 memes
 *     tags: [Memes]
 *     responses:
 *       200:
 *         description: The list of the memes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meme'
 */

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

// GET Route by id
/**
 * @swagger
 * /memes/{id}:
 *   get:
 *     summary: Get the meme by id
 *     tags: [Memes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meme id
 *     responses:
 *       200:
 *         description: The meme description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meme'
 *       404:
 *         description: The meme was not found
 */


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

// POST Route
/**
 * @swagger
 * /memes:
 *   post:
 *     summary: Create a new meme
 *     tags: [Memes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meme'
 *     responses:
 *       200:
 *         description: The meme was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Meme'
 *       500:
 *         description: Some server error
 */



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
    res.status(500).json({ message: err });
  }
});

// PATCH Route by id
/**
 * @swagger
 * /memes/{id}:
 *  patch:
 *    summary: Update the meme by the id
 *    tags: [Memes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The meme id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Meme'
 *    responses:
 *      200:
 *        description: The meme was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Meme'
 *      404:
 *        description: The meme was not found
 *      500:
 *        description: Some error happened
 */

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

// DELETE Route for id
/**
 * @swagger
 * /memes/{id}:
 *   delete:
 *     summary: Remove the meme by id
 *     tags: [Memes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meme id
 * 
 *     responses:
 *       200:
 *         description: The meme was deleted
 *       404:
 *         description: The meme was not found
 */

//API to delete a specific meme by its id
router.delete("/memes/:id", (req, res) => {
  Memes.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json())
    .catch((err) => res.status(400).json({ message: err }));
});

module.exports = router;
