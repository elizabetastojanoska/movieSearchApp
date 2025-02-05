<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$api_key = '0a5dcb789a518df89c2a8fd1d4954196'; 
$base_url = 'https://api.themoviedb.org/3';

if (isset($_GET['query'])) {
    $query = urlencode($_GET['query']); 
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1; 
    
    // Construct the API URL for the search request with the page parameter
    $url = "{$base_url}/search/movie?api_key={$api_key}&query={$query}&page={$page}";
    
    // Fetch the data from the TMDB API
    $response = file_get_contents($url);
    
    // Output the response as JSON
    echo $response;
} elseif (isset($_GET['movie_id'])) {
    // If the 'movie_id' parameter is set, fetch movie details
    $movie_id = $_GET['movie_id'];
    
    // Construct the API URL for the movie details request
    $url = "{$base_url}/movie/{$movie_id}?api_key={$api_key}&language=en-US";
    
    // Fetch the movie details
    $response = file_get_contents($url);
    
    // Output the response as JSON
    echo $response;
} else {
    echo json_encode(['error' => 'No valid query parameter provided.']);
}
