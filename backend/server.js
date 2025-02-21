const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware for CORS
app.use(cors());

// Fetch data from TMDB API
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
console.log(TMDB_API_KEY);

// Endpoint for fetching movies (now playing, popular, top rated, upcoming)
app.get('/api/movies/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${category}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movies');
  }
});

// Endpoint for searching movies, TV shows, and multi-search
app.get('/api/search', async (req, res) => {
  const { query, type } = req.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/${type}`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching');
  }
});

// Endpoint for fetching details of a specific movie/media
app.get('/api/media/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching media details');
  }
});


app.get('/api/tv/:category', async (req, res) => {
    const { category } = req.params;
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/tv/${category}`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching movies');
    }
  });

  app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching Movie details:', error);
      res.status(500).json({ error: 'Failed to fetch Movie details' });
    }
  });

  
  app.get('/api/tv/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      res.status(500).json({ error: 'Failed to fetch TV show details' });
    }
  });

  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
