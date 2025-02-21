import axios from 'axios';

const BASE_URL = 'http://localhost:6767/api'; 


export const fetchMovies = async (category, pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/movies/${category}/${pageNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
};


export const fetchTVShows = async (category, pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${category}/${pageNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return null;
  }
};


export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};


export const fetchTVShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
};


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
