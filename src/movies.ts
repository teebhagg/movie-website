

const movieRequests = () => {
  let featuredMoviesContainerElement = document.querySelector(
    ".featured_movies_content"
  );
  let featuredMoviesSectionElement = document.querySelector(
    ".featured_movies_section"
  );
  let customLoadingScreen = document.querySelector(".custom_loading_screen");

  const fetchData = async (page: number) => {
    const res = await fetch(apiUrl + `Superman&page=${page}&type=movie`);
    const data = await res.json();
    console.log(data)
    const movies: MovieData[] = data.Search;
    setTimeout(() => {
      movies.forEach((movie) => {
        if (featuredMoviesContainerElement) {
          const movieCard = document.createElement("div");
          movieCard.style.backgroundImage = `url(${movie.Poster})`;
          movieCard.className =
            "movie_card rounded-md flex flex-col justify-end hover:border-2 hover:border-white opacity-75 hover:opacity-100 md:h-72 lg:h-96  bg-no-repeat bg-cover";
            movieCard.innerHTML = `
            <div class="movie_details px-3 pb-3 pt-5 rounded-md bg-gradient-to-b from-transparent to-black/95">
              <div class="movies_title font-semibold">${movie.Title}</div>
              <div class="movies_year text-sm pt-2 font-light">${movie.Year}</div>
              <a href="movie_details.html?title=${movie.Title}">
                <button class="rounded-full px-5 py-2 mt-4 bg-gray-50/20 backdrop-filter backdrop-blur-md">
                  Watch Now
                </button>
              </a>
            </div>`;

          featuredMoviesContainerElement.appendChild(movieCard);
          if (customLoadingScreen) {
            customLoadingScreen.classList.add("hidden");
            customLoadingScreen.classList.remove("h-screen");
          }
        }
      });
    }, 1500);

    isLoading = false;
  };

  const handleScroll = () => {
    console.log("Scroll");
    if (
      !isLoading &&
      featuredMoviesSectionElement &&
      featuredMoviesContainerElement &&
      featuredMoviesSectionElement.scrollTop +
        featuredMoviesSectionElement.clientHeight >=
        featuredMoviesContainerElement.clientHeight
    ) {
      isLoading = true;
      page += 1;
      if (customLoadingScreen) {
        customLoadingScreen.classList.remove("hidden");
        customLoadingScreen.classList.remove("h-full");
      }
      setTimeout(() => {
        fetchData(page);
      }, 2000);
    }
  };

  fetchData(page);
  if (featuredMoviesSectionElement) {
    window.addEventListener("scroll", handleScroll);
  }
};