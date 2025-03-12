<template>
    <div class="movie-card">
        <div class="movie-content">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-description">{{ movie.description }}</p>
            <p class="movie-info">
                <strong>Duration:</strong> {{ movie.duration }} min
            </p>
            <p class="movie-info">
                <strong>Artists:</strong> {{ movie.artists.join(", ") }}
            </p>
            <p class="movie-info">
                <strong>Genres:</strong> {{ movie.genres.join(", ") }}
            </p>
            <button class="watch-button">
                <router-link :to="'/movie/' + movie.id">View Detail</router-link>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: Object,
    },
};
</script>

<style scoped>
.movie-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 12px;
    overflow: hidden;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.15);
}

.movie-content {
    text-align: start;
}

.movie-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.movie-description {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 15px;
}

.movie-info {
    font-size: 0.8rem;
    color: #555;
    margin-bottom: 8px;
}

.watch-button {
    display: inline-block;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    transition: background 0.3s;
}

.watch-button a {
    color: white;
    text-decoration: none;
}

.watch-button a:hover {
    text-decoration: none;
}

.watch-button:hover {
    background-color: #1f79da;
}
</style>