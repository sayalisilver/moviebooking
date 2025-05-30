const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genreController");


router.get("/genres", genreController.findAllGenres);

module.exports = router;
