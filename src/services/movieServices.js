import axios from "axios";

const API_URL = "http://localhost:3000/movies";

export default {
  async fetchMovies() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  async fetchMovieById(movieId) {
    try {
      const response = await axios.get(`${API_URL}/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with ID ${movieId}:`, error);
      throw error;
    }
  },

  async updateMovie(movieId, movieData) {
    try {
      const response = await axios.put(`${API_URL}/${movieId}`, movieData);
      return response.data;
    } catch (error) {
      console.error(`Error updating movie with ID ${movieId}:`, error);
      throw error;
    }
  }
};
