// // const APIKEY = '04c35731a5ee918f014970082a0088b1'
// const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

// const IMGPATH =  'https://image.tmdb.org/t/p/w1280';
// async function getMovies(){
//     const resp = await fetch(APIURL);
//     const respData = await resp.json();

//     console.log(respData);

//     respData.result.forEach((movie) => {
//         const img = document.createElement('img');
//         img.src = IMGPATH + movie.poster_path;

//         document.body.appendChild(img)
//     });
//     return respData;
// }
// getMovies();


const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

async function getMovies() {
  try {
    const resp = await fetch(APIURL);
    if (!resp.ok) {
      throw new Error('Failed to fetch movie data from API');
    }
    const respData = await resp.json();
    console.log(respData);
    if (!respData.results || !Array.isArray(respData.results)) {
      throw new Error('Invalid movie data received from API');
    }
    respData.results.forEach((movie) => {
      if (movie.poster_path) {
        const img = document.createElement('img');
        img.src = IMGPATH + movie.poster_path;
        // document.body.appendChild(img);
      }
    });
    return respData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

console.log(getMovies());