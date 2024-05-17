import axios, { Axios } from 'axios';

const API_KEY = '43840799-e71ea23b4db8ae9f9c01a8841';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;

export const fetchImages = (query, page = 1) => {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };
  return axios.get('?', { params: { ...searchParams } });
};
