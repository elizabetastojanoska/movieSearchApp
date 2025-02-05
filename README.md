# movieSearchApp

# Movie Search App with Favorites

This is a simple movie search application where users can search for movies using the TMDB API and add them to their favorites list. The favorites are stored in the browser's local storage, allowing users to persist their favorite movies even after closing the browser.

## Features

- **Movie Search**: Search for movies by title.
- **Add to Favorites**: Add movies to a favorites list.
- **View Favorite Movies**: View the list of movies that have been added to favorites.
- **Persistent Favorites**: Favorites are stored in the browser's local storage, allowing users to see them across sessions.
- **Movie Details**: Show a short description, release date, and a poster for each movie.

## Technologies Used

- **HTML**: For the structure of the web page.
- **CSS**: For styling the app (Bootstrap for responsive design).
- **JavaScript**: To handle the logic for movie search, displaying movies, and managing favorites.
- **PHP**: To act as a proxy between the API and the frontend part
- **TMDB API**: To fetch movie data such as title, description, poster, and release date.
- **Local Storage**: To store and retrieve the user's favorite movies.



## Setup Instructions

### 1. Clone the Repository

You can clone this repository to your local machine using the following command:

```bash
git clone https://github.com/elizabetastojanoska/movieSearchApp.git

### 2. Install Dependencies (Optional)
If you are using any package managers like npm or yarn for further project enhancements, make sure to install the necessary dependencies. For example, to install Bootstrap:

npm install bootstrap

### 3. Open the Project
Once the project is cloned, simply open the index.html file in a web browser. The app will load and be ready for use.
You need to use local server for the backend part, like XAMPP, WAMPP.

### 4. API Key
To fetch movie data from TMDB, you’ll need a TMDB API key.

Go to TMDB API and create an account.
Generate an API key from the TMDB account settings.
Replace the placeholder API key in your JavaScript code (if using one) or ensure you set it up in your PHP proxy (if applicable).

### 5. Local Storage
All movies added to the favorites list are stored in the browsers local storage. You can check your favorites across different sessions by reopening the app in the same browser.

## How It Works
# Movie Search:

The user enters a search query (movie title) in the search box.
The app fetches movies matching the query from the TMDB API.
Movies are displayed with their poster, title, release date, and a short description.
Adding to Favorites:

Each movie has an "Add to Favorites" button.
When clicked, the movie is added to the browsers local storage.

# Persistent Data:

Favorite movies persist between browser sessions using local storage.
Users can close and reopen the app, and their favorites will still be available.

### How to Add a Movie to Favorites
- Search for a movie by typing its title in the search box.
- Click the "Add to Favorites" button under the movie's details.
- The movie will be saved in the browser's local storage.
- You can view your favorite movies at any time, and they will be displayed on the - "Favorite Movies" section of the app.

### Sort the search results
Sort the search results by title or release year using the dropdown menu.

# License
This project is open-source and available under the MIT License.

# Credits
TMDB API: Used to fetch movie data (posters, descriptions, etc.).
Bootstrap: For responsive design and styling.


