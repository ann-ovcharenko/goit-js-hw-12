import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');

if (searchForm) {
  searchForm.addEventListener('submit', onSearch);
}
async function onSearch(event) {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();
  try {
    const data = await getImagesByQuery(query);
    const images = data.hits;
    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(images);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
}
