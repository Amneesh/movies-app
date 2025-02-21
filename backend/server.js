const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6767;

app.use(cors());

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

app.get("/api/movies/:category/:pageNumber", async (req, res) => {
  const { category, pageNumber } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${category}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: pageNumber,
      },
    });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies");
  }
});

app.get("/api/tv/:category/:pageNumber", async (req, res) => {
  const { category, pageNumber } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${category}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: pageNumber,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies");
  }
});

app.get("/api/search", async (req, res) => {
  const { query, type, pageNumber } = req.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/${type}`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: "en-US",
        page: pageNumber,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching");
  }
});

app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Movie details:", error);
    res.status(500).json({ error: "Failed to fetch Movie details" });
  }
});

app.get("/api/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    res.status(500).json({ error: "Failed to fetch TV show details" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
