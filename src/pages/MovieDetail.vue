<template>
    <div class="container">
      <h1 class="movie-title">{{ movie.title }}</h1>
      <p class="description">{{ movie.description }}</p>
      <p class="meta">Duration: {{ movie.duration }} min</p>
      <p class="meta">Genres: {{ Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres }}</p>
      <p class="meta">Artists: {{ movie.artists.join(", ") }}</p>
  
      <div v-if="embedUrl" class="video-container">
        <iframe :src="embedUrl" class="video-frame" frameborder="0" allowfullscreen></iframe>
      </div>
      <p v-else class="error">Invalid video URL</p>
  
      <div class="vote-section">
        <button @click="toggleVote" class="vote-button">
          {{ hasVoted ? "Unvote" : "Vote" }}
        </button>
        <span>{{ movie.votes.length }} Votes</span>
      </div>
  
      <p class="views">Total Views: {{ movie.views }}</p>
  
      <div v-if="isLoginPopupVisible" class="modal-overlay">
        <div class="modal-content">
          <button class="close-btn" @click="isLoginPopupVisible = false">✖</button>
          <LoginPopup @close="isLoginPopupVisible = false" />
        </div>
      </div>
    </div>
  </template>

<script>
import movieService from "@/services/movieServices";
import LoginPopup from "@/components/Login.vue";

export default {
  components: { LoginPopup },
  data() {
    return {
      movie: {
        title: "",
        description: "",
        duration: "",
        genres: [],
        artists: [],
        watchUrl: "",
        views: 0,
        votes: [],
      },
      user: null,
      isLoginPopupVisible: false,
    };
  },
  computed: {
    hasVoted() {
      return this.user && this.movie.votes.includes(this.user.id);
    },
    embedUrl() {
      return this.getEmbedUrl(this.movie.watchUrl);
    }
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
    }

    const movieId = this.$route.params.id;
    try {
      const res = await movieService.fetchMovieById(movieId);
      this.movie = res;
      this.movie.views++;
      await movieService.updateMovie(movieId, this.movie);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  },
  methods: {
    async toggleVote() {
      if (!this.user) {
        this.isLoginPopupVisible = true;
        return;
      }

      const movieId = this.movie.id;
      if (this.hasVoted) {
        this.movie.votes = this.movie.votes.filter(voterId => voterId !== this.user.id);
      } else {
        this.movie.votes.push(this.user.id);
      }

      await movieService.updateMovie(movieId, this.movie);
    },
    getEmbedUrl(url) {
      if (!url) return "";
      const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+&v=))([^&]+)/;
      const match = url.match(youtubeRegex);
      return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : "";
    }
  }
};
</script>

<style>
.movie-title {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}
.description {
    color: #555;
    margin-bottom: 10px;
}
.meta {
    font-size: 14px;
    line-height: 30px;
    color: #777;
}
.video-container {
    width: 100%;
    max-width: 640px;
    margin: 20px 0;
}
.video-frame {
    width: 100%;
    height: 360px;
    border-radius: 10px;
}
.vote-section {
    display: flex;
    align-items: center;
    gap: 10px;
}
.vote-button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
}
.views {
    color: #777;
    margin-top: 20px;
}
.error {
    color: red;
    font-size: 14px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}
</style>
