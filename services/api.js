import axios from 'axios';

const BASE_URL = 'http://localhost:6767/api'; // Your backend server

// Fetch Movies by Category (popular, now_playing, top_rated, upcoming)
export const fetchMovies = async (category, pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/movies/${category}/${pageNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
};

// Fetch TV Shows by Category (popular, top_rated, airing_today, on_the_air)
export const fetchTVShows = async (category, pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${category}/${pageNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return null;
  }
};

// Fetch Movie Details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Fetch TV Show Details by ID
export const fetchTVShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
};

// Search for Movies, TV Shows, or People
export const searchMedia = async (query, type = 'multi', pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query, type , pageNumber },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching media:', error);
    return null;
  }
};
