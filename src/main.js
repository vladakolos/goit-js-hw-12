import { fetchImages } from './js/pixabay-api.js';
import { renderTemplate } from './js/render-functions.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('form.form-search');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.loadMore');
const lightbox = new SimpleLightbox('.gallery a', {});

let page = 1;
let totalPages = 1;
let totalHits = 0;
let rememberLastValue;

const per_page = 15;
const requestImages = async (searchQuery, isFirstLoad = true) => {
  try {
    if (isFirstLoad) {
      page = 1;
      totalPages = 1;
    }

    if (page > totalPages) return;

    const data = await fetchImages(searchQuery, page);

    if (data.data.total === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        class: 'error',
        color: 'white',
      });
      loadMoreBtnEl.classList.add('d-none');
      return;
    }

    totalHits = data.data.totalHits;
    totalPages = Math.ceil(totalHits / per_page);
    page++;

    const imagesHtml = data.data.hits
      .map(image => renderTemplate(image))
      .join('');

    if (isFirstLoad) {
      galleryEl.innerHTML = imagesHtml;
    } else {
      galleryEl.insertAdjacentHTML('beforeend', imagesHtml);

      const { height: cardHeight } =
        galleryEl.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    lightbox.refresh();
    if (page >= totalPages) {
      loadMoreBtnEl.classList.add('d-none');
    } else {
      loadMoreBtnEl.classList.remove('d-none');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      message: 'Error fetching images. Please try again later.',
      position: 'topRight',
      class: 'error',
      color: 'white',
    });
    loadMoreBtnEl.classList.add('d-none');
  } finally {
    loaderEl.classList.add('is-hidden');
  }
};

if (formEl) {
  formEl.addEventListener('submit', async event => {
    event.preventDefault();
    loaderEl.classList.remove('is-hidden');
    galleryEl.innerHTML = '';
    const inputValue = formEl.elements.search.value.trim();

    if (!inputValue) {
      iziToast.error({
        message: 'Please enter a search term',
        position: 'topRight',
        class: 'error',
        color: 'white',
      });
      loadMoreBtnEl.classList.add('d-none');
      loaderEl.classList.add('is-hidden');
      return;
    }

    await requestImages(inputValue);
    rememberLastValue = inputValue;
    formEl.reset();
  });
}

if (loadMoreBtnEl) {
  loadMoreBtnEl.addEventListener('click', async () => {
    loaderEl.classList.remove('is-hidden');
    loadMoreBtnEl.classList.add('d-none');
    await requestImages(rememberLastValue, false);
    loadMoreBtnEl.classList.remove('d-none');
    loaderEl.classList.add('is-hidden');
  });
}
