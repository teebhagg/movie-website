"use strict";
const params = new URLSearchParams(window.location.search);
const onLoad = () => {
    const loader = document.querySelector(".custom_loading_screen");
    const movieTitle = document.querySelector(".movie_title");
    const movieYear = document.querySelector(".movie_year");
    const moviePoster = document.querySelector(".movie_poster");
    const movieType = document.querySelector(".movie_type");
    const mov = document.querySelector(".movie_type");
    const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=e2520da8&s=";
    const movie = params.get('title');
    console.log(movie);
    console.log(apiUrl);
    const getMovie = async () => {
        let res = await fetch(`${apiUrl}${movie}`);
        let data = await res.json();
        let movies = data.Search;
        console.log(data);
        if (moviePoster && movieTitle && movieType && movieYear) {
            moviePoster.src = movies[0].Poster;
            movieTitle.innerHTML = movies[0].Title;
            movieYear.innerHTML = `Year: ${movies[0].Year}`;
            movieType.innerHTML = `Type: ${movies[0].Type}`;
        }
    };
    getMovie();
    if (loader) {
        loader.classList.add("hidden");
    }
};
