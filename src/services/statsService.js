import axios from "axios";

const API_URL = "http://localhost:3000/movies";

export const statsService = {
    async fetchMovies() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    getTopMovies(movies) {
        return [...movies].sort((a, b) => b.views - a.views).slice(0, 5);
    },

    getGenreData(movies) {
        const genreCount = {};
        movies.forEach(movie => {
            movie.genres.forEach(genre => {
                genreCount[genre] = (genreCount[genre] || 0) + 1;
            });
        });
        return genreCount;
    },

    getVotedMovies(movies) {
        return [...movies].sort((a, b) => b.votes.length - a.votes.length).slice(0, 5);
    }
};
