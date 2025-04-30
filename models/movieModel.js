const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieid: { type: Number, required: true, unique: true},
  title: {type: String, required: true},
  published: {type: Boolean,default: false},
  released: { type: Boolean,default: false
  },
  poster_url: { type: String
  },
  release_date: { type: Date
  },
  publish_date: {type: Date
  },
  artists: [{type: mongoose.Schema.Types.ObjectId,ref: 'Artist'
  }],
  genres: [{type: mongoose.Schema.Types.ObjectId,ref: 'Genre'
  }],
  duration: {type: Number
  },
  critic_rating: {type: Number
  },
  trailer_url: {type: String
  },
  wiki_url: {type: String
  },
  story_line: {type: String
  },
  shows: [{
    id: {type: Number
    },
    theatre: {name: {type: String },city: { type: String}
    },
    language: {type: String
    },
    show_timing: {
type: Date
    },
    available_seats: {
      type: Number
    },
    unit_price: {
      type: Number
    }
  }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
