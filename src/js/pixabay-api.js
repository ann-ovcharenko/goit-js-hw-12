import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52541896-5f78a6ef84d614b23e8cef476';
export const PER_PAGE = 15;
export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images from Pixabay.');
  }
}
