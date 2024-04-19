import axios from 'axios';

export const BASE_URL = 'https://api.jikan.moe/v4';

export const api = axios.create({
  baseURL: BASE_URL,
});
