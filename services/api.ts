export const TMDB_CONFIG = {
BASE_URL: 'https://api.themoviedb.org/3',
API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
headers:{
accept:'application/json',
Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
}
}

export const fetchMovies = async ({query}:{query: string})=>{
const endpoint = query
?`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
:`${TMDB_CONFIG.BASE_URL}/discover/movie?sort-by=popularity.desc`;
const response = await fetch (endpoint,{
    method: 'GET',
    headers: TMDB_CONFIG.headers,
});
if(!response.ok){
    throw new Error('Failed to fetch movies',response.statusText)
}
const data = await response.json();
return data.results;
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDM5ZDA5YzVjOTU5ZDAzMjRlNTNhODQ5MjRjMzUzZiIsIm5iZiI6MTc0Mzg1ODA2MC4xMjksInN1YiI6IjY3ZjEyOThjYTczMzY4NzBlZTk5MzdkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yj8SnQ0FZddtJbJlUrS59vt10Z6Qd77IJ2mnoaEORPw'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));