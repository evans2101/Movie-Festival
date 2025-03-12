<template>
  <div class="container">
    <h1 class="title">Movie Festival</h1>
    <input v-model="search" placeholder="Search movies..." class="search-input" />

    <div class="grid">
      <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="page-button">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="page-button">Next</button>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import movieService from "@/services/movieServices";

export default {
  components: { MovieCard },
  data() {
    return {
      movies: [],
      search: "",
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie => {
        const query = this.search.toLowerCase();
        return (
          movie.title.toLowerCase().includes(query) ||
          movie.description.toLowerCase().includes(query) ||
          movie.artists.some(artist => artist.toLowerCase().includes(query)) ||
          movie.genres.some(genre => genre.toLowerCase().includes(query))
        );
      });
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredMovies.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  async mounted() {
    try {
      const res = await movieService.fetchMovies();
      this.movies = res;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
};
</script>

<style>
.title {
  font-size: 24px;
  margin-top: 20px;
  font-weight: bold;
  text-align: start;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.page-button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.page-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
