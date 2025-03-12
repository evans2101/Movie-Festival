import { defineStore } from "pinia";
import axios from "axios";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    loading: false,
  }),
  actions: {
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/movies");
        this.movies = response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
