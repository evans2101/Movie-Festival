# Movie Festival

**Movie Festival** is a web application that allows users to browse, search, and vote for movies. The platform displays a list of movies with details like title, description, genres, artists, and video embed options. Users can view movie details, vote for their favorite movies, and explore various genres.

---

## Features

- **Movie List**: Display a paginated list of movies with basic information.
- **Search Functionality**: Allows users to search movies by title, description, artists, or genres.
- **Movie Details**: View detailed information about a specific movie, including genres, artists, and an embedded video.
- **Voting System**: Users can vote for movies. Each movie's vote count is updated in real-time.
- **User Authentication**: Users need to log in to vote for movies. A login popup is shown when users attempt to vote without being logged in.
- **Responsive Design**: The app is responsive and works across devices such as desktops, tablets, and smartphones.

---

## Installation

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (v12 or higher)
- npm or yarn
- A running backend API (the app expects a movie API at `http://localhost:3000/movies`)

### Step-by-Step Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/movie-festival.git
   cd movie-festival


2. **Install dependencies:**:

   ```npm install

3. **Start the development server:**:

   ```npm run serve

4. **Open your browser and navigate to http://localhost:8080 to access the app.**:

# Project structure

movie-festival/
│
├── src/
│   ├── assets/            # Static assets (images, fonts, etc.)
│   ├── components/        # Reusable UI components (e.g., MovieCard, LoginPopup)
│   ├── pages/             # Vue components for each page (e.g., Homepage, MovieDetail)
│   ├── services/          # Movie service for API calls
│   ├── router/            # Routing configuration (Vue Router)
│   ├── store/             # Vuex store for state management (if used)
│   └── App.vue            # Root component
│
├── public/                # Static files (index.html)
├── package.json           # Project configuration and dependencies
└── README.md              # Project documentation

Components
1. MovieCard.vue
Displays each movie in the list with basic information like title, description, and genres. Users can click on the movie card to view its details.

2. MovieDetail.vue
Displays detailed information about a single movie, including its title, description, duration, genres, artists, and an embedded video. It also includes a voting button to allow users to vote for the movie.

3. LoginPopup.vue
A modal that appears when a user tries to vote but is not logged in. It prompts the user to log in before voting.

Services
movieService.js
The movieService.js file contains functions to interact with the backend API, including fetching, creating, updating, and deleting movies. The service uses axios to handle HTTP requests.

Functions:

fetchMovies(): Fetches the list of all movies.
fetchMovie(id): Fetches a single movie by its ID.
createMovie(movie): Creates a new movie.
updateMovie(id, movie): Updates an existing movie.
deleteMovie(id): Deletes a movie.

API
This application interacts with a backend API for storing and fetching movie data. Below are the endpoints:

GET /movies: Fetch all movies.
GET /movies/{id}: Fetch a movie by its ID.
POST /movies: Create a new movie.
PUT /movies/{id}: Update an existing movie.
DELETE /movies/{id}: Delete a movie.
The backend should return movie data in the following format:

{
  "id": 1,
  "title": "Movie Title",
  "description": "Movie description here",
  "genres": ["Drama", "Action"],
  "artists": ["Artist 1", "Artist 2"],
  "watchUrl": "https://www.youtube.com/watch?v=example",
  "views": 123,
  "votes": [1, 2, 3] // Array of user IDs who have voted
}


# Running Tests
To run tests (if applicable), you can use:

```npm run test

Contributing
If you'd like to contribute to the Movie Festival project, feel free to open a pull request! Please ensure your code adheres to the following guidelines:

Fork the repository and clone it to your local machine.
Create a feature branch for your changes (git checkout -b feature-branch).
Make your changes and test them locally.
Commit your changes with clear and concise commit messages.
Push your changes to your forked repository and open a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.