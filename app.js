const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieList = document.getElementById('movie-list');
const sortDropdown = document.getElementById('sort-dropdown');
const paginationDiv = document.getElementById('pagination');
const modal = document.getElementById('movie-modal');
const closeModal = document.getElementById('close-modal');

let allMovies = [];
let currentPage = 1;
let totalPages = 1;
let moviesPerPage = 20;
let sortedMovies = [];
let currentQuery = "";
let totalResults = 0;

// Show the loading indicator
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide the loading indicator
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Function to fetch movies for a specific page and return the results
async function fetchMovies(query, page) {
    showLoading();
    try {
        const response = await fetch(`proxy.php?query=${query}&page=${page}`);
        const data = await response.json();
        totalResults = data.total_results;
        totalPages = Math.ceil(totalResults / moviesPerPage);
        return data.results;
        hideLoading();
    } catch (error) {
        console.error('Error fetching movies:', error);
        hideLoading();
        return [];
    }
}

// Function to fetch all movies (through multiple pages)
async function fetchAllMovies(query) {
    allMovies = [];
    let page = 1;
    while (true) {
        const movies = await fetchMovies(query, page);
        if (movies.length === 0) break;
        allMovies = [...allMovies, ...movies];
        page++;
    }
    applySorting(sortDropdown.value);
}

// Function to apply sorting to the entire list of movies
function applySorting(sortBy) {
    if (sortBy === 'title') {
        sortedMovies = allMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'release_date') {
        sortedMovies = allMovies.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
        });
    }
    totalPages = Math.ceil(sortedMovies.length / moviesPerPage);
    displayMoviesForPage(1);
}

// Function to display movies for the current page
function displayMoviesForPage(page) {
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    const moviesToDisplay = sortedMovies.slice(start, end);
    displayMovies(moviesToDisplay);
    displayPagination();
}

// Function to display movies in the HTML
function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `<div class="card">
            <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="card-body">
                        <h5 class="card-title text-warning">${movie.title}</h5>
                        <p class="card-text text-warning">${movie.release_date}</p>
                        
                    </div>
                    <button id="favorite-button-${movie.id}" class="btn btn-warning btn-sm" onclick="toggleFavorite(${movie.id}, '${movie.title}', '${movie.poster}', '${movie.overview}')">
                            Add to Favorites
                        </button>
            </div>
        `;
        movieItem.addEventListener('click', () => {
            showMovieDetails(movie.id);
        });
        movieList.appendChild(movieItem);
        hideLoading();
    });
}

// Function to display pagination controls
function displayPagination() {
    paginationDiv.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage <= 1;
    prevButton.classList.toggle('disabled', currentPage <= 1);
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMoviesForPage(currentPage);
        }
    });
    paginationDiv.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage >= totalPages;
    nextButton.classList.toggle('disabled', currentPage >= totalPages);
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayMoviesForPage(currentPage);
        }
    });
    paginationDiv.appendChild(nextButton);
}

// Function to fetch and display movie details in the modal
async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`proxy.php?movie_id=${movieId}`);
        const data = await response.json();

        if (data) {
            document.getElementById('movie-title').textContent = data.title;
            document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            document.getElementById('movie-description').textContent = data.overview;
            document.getElementById('movie-rating').textContent = data.vote_average;
            document.getElementById('movie-genres').textContent = data.genres.map(genre => genre.name).join(', ');
            document.getElementById('movie-runtime').textContent = data.runtime;

            modal.style.display = "block";

        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Function to handle the search button click event
async function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        await fetchAllMovies(query);
    } else {
        movieList.innerHTML = '<p>Please enter a search term.</p>';
    }
}

// Search button click event
searchBtn.addEventListener('click', handleSearch);

// Sort dropdown change event
sortDropdown.addEventListener('change', () => {
    if (allMovies.length > 0) {
        applySorting(sortDropdown.value);
    }
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

