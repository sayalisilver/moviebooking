const Artist = require('../models/artistModel');

//---Find all artists
exports.findAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching artists", error: err });
  }
};

