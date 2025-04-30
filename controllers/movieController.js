const Movie = require('../models/movieModel');

// -----FInd all movies----
exports.findAllMovies = async (req, res) => {
  try {
    const query = {};

    if (req.query.status) {
      if (req.query.status === 'PUBLISHED') {
        query.published = true;
      } else if (req.query.status === 'RELEASED') {
        query.released = true;
      }
    }

    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: 'i' };
    }

    if (req.query.genres) {
      query.genres = { $in: req.query.genres.split(',') };
    }

    if (req.query.artists) {
      query.artists = { $in: req.query.artists.split(',') };
    }

    if (req.query.start_date && req.query.end_date) {
      query.release_date = {
        $gte: new Date(req.query.start_date),
        $lte: new Date(req.query.end_date)
      };
    }

    const movies = await Movie.find(query)
      .populate('artists')
      .populate('genres');

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---Find one movie--
exports.findOne = async (req, res) => {
    try {
      const movie = await Movie.findOne({ movieid: req.params.movieId })
        .populate('artists')
        .populate('genres');
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//----findShows---
exports.findShows = async (req, res) => {
    try {
      const movie = await Movie.findOne({ movieid: req.params.movieId });
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.json(movie.shows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
