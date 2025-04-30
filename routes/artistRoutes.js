const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');


router.get('/artists', artistController.findAllArtists);

module.exports = router;
