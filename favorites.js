const favoritesList = document.getElementById('favorite-movies-list');

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Display the favorites list on page load
displayFavorites();

// Function to check if a movie is in the favorites list
function isFavorite(movieId) {
    return favorites.some(movie => movie.id === movieId);
}

// Function to toggle favorite status
function toggleFavorite(id, title, poster, overview) {
    const movie = { id, title, poster, overview };
    const isAlreadyFavorite = isFavorite(id);

    if (isAlreadyFavorite) {
        favorites = favorites.filter(movie => movie.id !== id);
    } else {
        favorites.push(movie);
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Function to display the favorites list
function displayFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `<div class="card">
                    <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="${movie.title}">
                    <div class="card-body">
                    <h3 class="card-title text-warning">${movie.title}</h3>
                    </div>
                    </div>
                `;
        favoritesList.appendChild(movieItem);
    });
}

