const Genre = require("../models/genreModel"); 

// --Find All Genres---
exports.findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({ genres });

  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving genres." });
  }
};
