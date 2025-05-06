const Movie = require('../models/movieModel');
const Artist = require('../models/artistModel');
const Genre = require('../models/genreModel');
// -----FInd all movies----



  exports.findAllMovies = async (req, res) => {
    try {
      const {
        status,
        title,
        genres,
        artists,
        start_date,
        end_date,
      } = req.query;
  
      const query = {};
  

      if (status === "RELEASED") {
        query.released = true;
      } else if (status === "PUBLISHED") {
        query.published = true;
      }
  
      // Filter by title
      if (title) {
        query.title = { $regex: title, $options: "i" };
      }
  

      if (genres) {
        const genreNames = genres.split(",").map((g) => g.trim().toLowerCase());
  
        const genreDocs = await Genre.find({ genre: { $in: genreNames } }, "genre");

          query.genres = { $in: genreNames }; 
      }
  

  
        if (artists) {
            const artistNames = artists.split(",").map((a) => a.trim().toLowerCase());
        
            query["artists.first_name"] = { $in: artistNames.map(name => name.split(" ")[0]) };
            query["artists.last_name"] = { $in: artistNames.map(name => name.split(" ").slice(1).join(" ")) };
          }

        if (start_date || end_date) {
            query.$expr = {
              $and: [
                start_date ? { $gte: [{ $dateFromString: { dateString: "$release_date", format: "%m/%d/%Y" } }, new Date(start_date)] } : {},
                end_date ? { $lte: [{ $dateFromString: { dateString: "$release_date", format: "%m/%d/%Y" } }, new Date(end_date)] } : {}
              ]
            };
          }
          

      console.log('Generated Query:', query);
  
      const movies = await Movie.find(query)
        .populate("artists")
     
  
      res.status(200).json({ movies });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving movies", error: err.message });
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
