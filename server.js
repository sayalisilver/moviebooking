const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { DB_URL } = require('./config/dbconfig'); // your dbconfig file
const movieRoutes = require('./routes/movieRoutes');
const artistRoutes = require('./routes/artistRoutes');
const genreRoutes = require('./routes/genreRoutes');
const userRoutes = require('./routes/userRoutes'); 
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(DB_URL)
  .then(() => console.log('Connected to Database!'))
  .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
  });

// Default route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

// API routes
app.use('/api', movieRoutes);
app.use('/api', artistRoutes);
app.use('/api', genreRoutes);
app.use('/api', userRoutes);

// Start server
const PORT = 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
