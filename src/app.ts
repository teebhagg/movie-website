let page: number = 1;
let isLoading: boolean = false;
const apiUrl: string = "http://www.omdbapi.com/?i=tt3896198&apikey=e2520da8&s=";

const homeRequests = () => {
  let featuredMoviesContainerElement = document.querySelector(
    ".featured_movies_content"
  );
  let featuredMoviesSectionElement = document.querySelector(
    ".featured_movies_section"
  );
  let customLoadingScreen = document.querySelector(".custom_loading_screen");

  const fetchData = async (page: number) => {
    const res = await fetch(apiUrl + `Love&page=${page}`);
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

const clearSearch = () => {
  const searchOptionsContainer = document.querySelector(
    ".search_options_container"
  );
  const searchInput = document.querySelector(
    ".search_input"
  ) as HTMLInputElement;
  if (searchOptionsContainer && searchInput) {
    searchOptionsContainer.classList.add("hidden");
    searchInput.value = ''
  }
};

const searchMovies = async () => {
  const searchInput = document.querySelector(
    ".search_input"
  ) as HTMLInputElement;
  const searchOptions = document.querySelector(".search_options");
  const searchOptionsContainer = document.querySelector(
    ".search_options_container"
  );
  if (searchInput) {
    if (searchInput.value.length >= 3) {
      console.log(searchInput.value);
      try {
        let res = await fetch(`${apiUrl}${searchInput.value}&page=1`);
        console.log("Start Fetch");
        let data = await res.json();
        let movies: MovieData[] = data.Search;
        if (searchOptions && searchOptionsContainer) {
          searchOptions.innerHTML = "";
          console.log(movies);
          if (movies === undefined) {
            console.log("EMPTY LIIIIIIIIIST");
            searchOptions.innerHTML = `
            <div class="custom-loader-sm mx-auto my-5"></div>
            `;
          }
          movies.map((movie) => {
            searchOptionsContainer.classList.remove("hidden");
            searchOptions.innerHTML =
              searchOptions.innerHTML +
              `<a href="movie_details.html?title=${movie.Title}" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 hover:text-gray-900" role="menuitem" tabindex="-1" id="menu-item-0">${movie.Title} settings</a>`;
          });
        }
        console.log("Options");
      } catch (error) {
        console.log(error);
      }
    }
    if (searchInput.value.length < 1) {
      if (searchOptionsContainer && searchOptions) {
        searchOptionsContainer.classList.add("hidden");
        searchOptions.innerHTML = "";
      }
    }
  }
};

const toggleDrawer = () => {
  const drawer = document.getElementById("mobile-menu");
  if (drawer) {
    const isHidden: boolean = drawer.classList.contains("hidden");
    if (isHidden) {
      drawer.classList.remove("hidden");
    } else {
      drawer.classList.add("hidden");
    }
  }
};

