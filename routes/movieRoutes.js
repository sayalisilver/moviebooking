const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Movies routes
router.get('/movies', movieController.findAllMovies);
router.get('/movies/:movieId', movieController.findOne);
router.get('/movies/:movieId/shows', movieController.findShows);

module.exports = router;
