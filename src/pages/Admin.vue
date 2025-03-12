<template>
    <div class="container">
        <h1 class="admin">List Movies</h1>

        <button @click="openModal('add')" class="add-button">➕ Add New Movie</button>

        <div class="table-container">
            <table class="movie-table">
                <thead>
                    <tr>
                        <th class="title-column">Title</th>
                        <th class="duration-column">Duration</th>
                        <th class="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movie in paginatedMovies" :key="movie.id" class="table-row">
                        <td class="table-cell">{{ movie.title }}</td>
                        <td class="table-cell">{{ movie.duration }} min</td>
                        <td class="table-cell actions">
                            <button @click="openModal('edit', movie)" class="edit-button">✏️ Edit</button>
                            <button @click="deleteMovie(movie.id)" class="delete-button">🗑 Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">◀</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">▶</button>
        </div>

        <AdminStats />

        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <button class="close-btn" @click="closeModal">✖</button>
                <h2 class="modal-title">{{ isEditing ? "Edit Movie" : "Add Movie" }}</h2>
                <form @submit.prevent="submitMovie">
                    <input v-model="movie.title" placeholder="Title" class="input-field" required />
                    <textarea v-model="movie.description" placeholder="Description" class="input-field"></textarea>
                    <input v-model.number="movie.duration" type="number" placeholder="Duration (minutes)"
                        class="input-field" required />
                    <input v-model="movie.artists" placeholder="Artists (comma separated)" class="input-field" />
                    <input v-model="movie.genres" placeholder="Genres (comma separated)" class="input-field" />
                    <input v-model="movie.watchUrl" placeholder="Watch URL" class="input-field" required />

                    <div class="modal-actions">
                        <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
                        <button type="submit" class="btn-submit">{{ isEditing ? "Update" : "Upload" }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { movieService } from "@/services/movieService";
import AdminStats from "./AdminStats.vue";

export default {
    name: "AdminDashboard",
    components: {
        AdminStats,
    },
    data() {
        return {
            movies: [],
            movie: { title: "", description: "", duration: "", artists: "", genres: "", watchUrl: "" },
            isEditing: false,
            editingId: null,
            showModal: false,
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.movies.length / this.itemsPerPage);
        },
        paginatedMovies() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.movies.slice(start, end);
        },
    },
    async mounted() {
        await this.fetchMovies();
    },
    methods: {
        async fetchMovies() {
            try {
                this.movies = await movieService.fetchMovies();
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        async submitMovie() {
            if (!this.movie.title || !this.movie.duration || !this.movie.watchUrl) {
                alert("Title, Duration, and Watch URL are required!");
                return;
            }

            const formattedMovie = {
                ...this.movie,
                artists: this.movie.artists ? this.movie.artists.split(",").map(a => a.trim()) : [],
                genres: this.movie.genres ? this.movie.genres.split(",").map(g => g.trim()) : [],
            };

            try {
                if (this.isEditing) {
                    await movieService.updateMovie(this.editingId, formattedMovie);
                } else {
                    await movieService.createMovie(formattedMovie);
                }
                this.closeModal();
                await this.fetchMovies();
            } catch (error) {
                console.error("Error saving movie:", error);
            }
        },
        async deleteMovie(id) {
            if (!confirm("Are you sure you want to delete this movie?")) return;
            try {
                await movieService.deleteMovie(id);
                await this.fetchMovies();
            } catch (error) {
                console.error("Error deleting movie:", error);
            }
        },
        openModal(type, movie = null) {
            this.isEditing = type === "edit";
            this.showModal = true;
            if (this.isEditing && movie) {
                this.editingId = movie.id;
                this.movie = { ...movie, artists: movie.artists.join(", "), genres: movie.genres.join(", ") };
            } else {
                this.resetForm();
            }
        },
        closeModal() {
            this.showModal = false;
            this.resetForm();
        },
        resetForm() {
            this.movie = { title: "", description: "", duration: "", artists: "", genres: "", watchUrl: "" };
            this.isEditing = false;
            this.editingId = null;
        },
    },
};
</script>

<style>
.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.admin {
    padding: 20px 0;
    font-size: 24px;
    font-weight: bold;
}

.add-button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
}

.table-container {
    margin-top: 20px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
}

.movie-table {
    width: 100%;
    border-collapse: collapse;
}

.movie-table th,
.movie-table td {
    padding: 12px;
    text-align: left;
}

.title-column {
    width: 50%;
}

.duration-column {
    width: 20%;
}

.actions-column {
    width: 30%;
}

.table-row:hover {
    background: #f5f5f5;
}

.actions {
    display: flex;
    gap: 10px;
}

.edit-button {
    background: #ffc107;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.delete-button {
    background: #dc3545;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 25px;
    width: 420px;
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 10px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
}

.btn-cancel {
    background: #ccc;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
}

.btn-submit {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 10px;
}

.pagination button {
    background: #007bff;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>