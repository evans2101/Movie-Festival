<template>
  <div class="containerStats mx-auto p-6">
    <h1 class="admin">Movie Statistics</h1>

    <div class="flex flex-col gap-6">
      <div class="card w-full mb-5">
        <h2 class="card-title">🔥 Top Watched Movies</h2>
        <canvas ref="moviesChart"></canvas>
      </div>

      <div class="card w-full mb-5">
        <h2 class="card-title">🎭 Most Watched Genres</h2>
        <canvas ref="genreChart"></canvas>
      </div>

      <div class="card w-full mb-5">
        <h2 class="card-title">🏆 Most Voted Movies</h2>
        <canvas ref="votesChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { statsService } from "@/services/statsService";

export default {
  data() {
    return {
      movies: []
    };
  },
  computed: {
    topMoviesData() {
      const topMovies = statsService.getTopMovies(this.movies);
      return {
        labels: topMovies.map(m => m.title),
        data: topMovies.map(m => m.views)
      };
    },
    genreData() {
      return statsService.getGenreData(this.movies);
    },
    votedMoviesData() {
      return statsService.getVotedMovies(this.movies);
    }
  },
  async mounted() {
    try {
      this.movies = await statsService.fetchMovies();
      this.renderCharts();
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },
  methods: {
    renderCharts() {
      if (this.$refs.moviesChart) {
        new Chart(this.$refs.moviesChart, {
          type: "bar",
          data: {
            labels: this.topMoviesData.labels,
            datasets: [{
              label: "Top Watched Movies",
              data: this.topMoviesData.data,
              backgroundColor: "#ffa500"
            }]
          }
        });
      }

      if (this.$refs.genreChart) {
        new Chart(this.$refs.genreChart, {
          type: "bar",
          data: {
            labels: Object.keys(this.genreData),
            datasets: [{
              label: "Most Watched Genres",
              data: Object.values(this.genreData),
              backgroundColor: "#ff6b6b"
            }]
          }
        });
      }

      if (this.$refs.votesChart) {
        new Chart(this.$refs.votesChart, {
          type: "bar",
          data: {
            labels: this.votedMoviesData.map(m => m.title),
            datasets: [{
              label: "Most Voted Movies",
              data: this.votedMoviesData.map(m => m.votes.length),
              backgroundColor: "#1e90ff"
            }]
          }
        });
      }
    }
  }
};
</script>

<style>
.containerStats {
  max-width: 1200px;
}

.admin {
  padding: 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.card {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  transition: transform 0.3s;
  width: 100%;
  margin-bottom: 20px;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.highlight {
  font-weight: bold;
  color: #222;
}
</style>