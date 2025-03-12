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