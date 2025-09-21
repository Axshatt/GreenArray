import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://greenarray-1.onrender.com/',
  withCredentials: false,
});