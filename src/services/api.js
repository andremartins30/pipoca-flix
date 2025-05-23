// Base da URL: https://api.themoviedb.org/3/
//URL DA API: movie/now_playing?api_key=45987c192cb22153a3fd72a71eee5003&language=pt-br

//b028504862e94a9696a210141ee95315

import axios from "axios";

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

const rawgApi = axios.create({
    baseURL: 'https://api.rawg.io/api/'
});

export { tmdbApi, rawgApi };