import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'http://localhost:3001', // Base URL của json-server
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // Báo cho server biết dữ liệu là JSON
  },
});

export default movieApi;