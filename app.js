// const APIKEY = '04c35731a5ee918f014970082a0088b1';
// const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;
// const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
// const SEARCHAPI = "http://api.themoviedb.org/3/search/movie?api_key=[API_KEY]&query="


// const main = document.querySelector('main')
// const form = document.getElementById('form')
// const search =document.getElementById('search')

// //initially get fav movies 
// getMovies(APIURL) // first usage

// console.log(getMovies());

// async function getMovies(url) {
//   try {
//     const resp = await fetch(url);
//     if (!resp.ok) {
//       throw new Error('Failed to fetch movie data from API');
//     }
//     const respData = await resp.json();
//     console.log(respData);
    
//     showMoviesTo(respData.results)
//     if (!respData.results || !Array.isArray(respData.results)) {
//       throw new Error('Invalid movie data received from API');
//     }
   
//     return respData;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// function showMoviesTo(movies){
//   //clear main
//   main.innerHTML='';
//   movies.forEach((movie) => {
//     const {poster_path , title, vote_average} = movie;
//     if (movie.poster_path) {
//       // const img = document.createElement('img');
//       const movieEl = document.createElement('div')
//       movieEl.classList.add('movie')
//       movieEl.innerHTML=`
      
//           <img 
//           src="${IMGPATH + poster_path}" 
//           alt="${title}"/>
//           <div class="movie-info">
//               <h3>${title}</h3>
//               <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
//           </div>
//        `
//       // img.src = IMGPATH + movie.poster_path;
//       main.appendChild(movieEl); // document.body.appendChild(movieEl);
//     }
//   });
// }

// function getClassByRate(vote){
//   if(vote >= 8) {
//     return 'green'
//   }
//   else if(vote >= 5) {
//     return 'orange'
//   }
//   else {
//     return 'red'
//   }
// }

// form.addEventListener('submit',(e)=>{
  
//   searhTerm = search.value;

//   if(searhTerm){
//     getMovies(SEARCHAPI + searhTerm) // second time usage
//     search.value='';
//   }
//   e.preventDefault()
// });


const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=`;

const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Initially get popular movies
getMovies(APIURL); // first usage

async function getMovies(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error('Failed to fetch movie data from API');
    }
    const respData = await resp.json();
    console.log(respData);
    
    showMoviesTo(respData.results);
    return respData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function showMoviesTo(movies) {
  // Clear main
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { poster_path, title, vote_average,overview } = movie;
    if (poster_path) {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
          <img src="${IMGPATH + poster_path}" 
          alt="${title}"/>
          <div class="movie-info">
              <h3>${title}</h3>
              <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
          </div>
          <div class="overview">
              ${overview}
                  </div>
       `;
        // img.src = IMGPATH + movie.poster_path;
      main.appendChild(movieEl);// document.body.appendChild(movieEl);
    }
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    const searchURL = SEARCHAPI + searchTerm;
    const respData = await getMovies(searchURL);  // second time usage
    if (respData.results.length === 0) {
      main.innerHTML = '<h1>No results found</h1>';
    }
    search.value = '';
  }
});
// if(searhTerm){
  //     getMovies(SEARCHAPI + searhTerm) // second time usage
  //     search.value='';
  //   }
  //   e.preventDefault()
  // });

