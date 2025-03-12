import axios from "axios";

const API_URL = "http://localhost:3000/movies";

export const movieService = {
    async fetchMovies() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    async createMovie(movie) {
        try {
            const response = await axios.post(API_URL, movie);
            return response.data;
        } catch (error) {
            console.error("Error creating movie:", error);
            throw error;
        }
    },

    async updateMovie(id, movie) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, movie);
            return response.data;
        } catch (error) {
            console.error("Error updating movie:", error);
            throw error;
        }
    },

    async deleteMovie(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting movie:", error);
            throw error;
        }
    },
};
