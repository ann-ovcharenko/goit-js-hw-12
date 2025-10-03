import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalPages = 0;

const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more-btn');

if (searchForm) {
  searchForm.addEventListener('submit', onSearch);
}
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', onLoadMore);
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
  currentPage = 1;
  currentQuery = query;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;
    const totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(images);
      scrollSmoothly(images.length);
    }
    if (images.length > 0 && totalPages > currentPage) {
      showLoadMoreButton();
    } else if (images.length > 0) {
      showEndOfCollectionMessage();
    }
    searchForm.reset();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
async function onLoadMore() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    createGallery(images);
    scrollSmoothly(images.length);
    if (currentPage >= totalPages) {
      showEndOfCollectionMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
function scrollSmoothly(numNewItems) {
  if (numNewItems > 0) {
    const firstGalleryItem = document.querySelector('.gallery-item');
    if (firstGalleryItem) {
      const cardHeight = firstGalleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }
}

function showEndOfCollectionMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'bottomCenter',
  });
  hideLoadMoreButton();
}
