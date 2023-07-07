
// Base da URL: https://api.themoviedb.org/3/
//URL DA API: movie/now_playing?api_key=45987c192cb22153a3fd72a71eee5003&language=pt-br

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;