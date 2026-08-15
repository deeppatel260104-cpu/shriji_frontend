import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`, 
  withCredentials: true,
  timeout:1500,
  headers: {
    'Content-Type': 'application/json',
  },

});

export default API;