import axios from 'axios';

// Base URL https://api.themoviedb.org/3/
// URL da Api: movie/now_playing?api_key=a3536b3c476761dc74aa65ba36f52b0d&language=pt

const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/'
});

export default api;