import axios from 'axios';

const OMDB_API_KEY = 'b483ebe8';

export const searchMovie = async (title) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
    console.log('OMDB API response:', response.data);
    if (response.data.Response === 'True') {
      return {
        Title: response.data.Title,
        Plot: response.data.Plot,
        Year: response.data.Year,
        Poster: response.data.Poster
      };
    }
    throw new Error(response.data.Error || 'Movie not found');
  } catch (error) {
    const errorMessage = error.response?.data?.Error || error.message || 'Failed to fetch movie data';
    throw new Error(errorMessage);
  }
};