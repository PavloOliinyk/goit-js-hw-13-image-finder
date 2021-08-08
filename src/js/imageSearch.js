import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import FetchImageApi from './apiService';
import imageCardTemplate from '../templates/image-card.hbs';
import getRefs from './refs';
import { noticeError, noticeSuccess, setDefaultsDelay } from './notifications';
require('default-passive-events');
import * as basicLightbox from 'basiclightbox';

setDefaultsDelay(2000);
const imageSearch = new FetchImageApi();

const Refs = getRefs();

function onSearch(e) {
  e.preventDefault();
  const request = e.currentTarget.elements.query.value;

  if (request === '') {
    noticeError();
    return;
  }

  imageSearch.query = request;
  imageSearch.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  imageSearch.fetchImage().then(images => {
    if (images.length < 1) {
      noticeError();
      return;
    }

    appendImagesMarkUp(images);
    noticeSuccess();
  });
}

function onLoadMoreImages() {
  imageSearch.fetchImage().then(appendImagesMarkUp);
}

Refs.search.addEventListener('submit', onSearch);
Refs.loadMoreBtn.addEventListener('click', onLoadMoreImages);

function appendImagesMarkUp(images) {
  Refs.gallery.insertAdjacentHTML('beforeend', imageCardTemplate(images));
}

function clearImagesContainer() {
  Refs.gallery.innerHTML = '';
}

function onShowModal(e) {
  const modalImage = e.target.dataset.source;

  const instance = basicLightbox.create(`
      <img src=${modalImage} width="800" height="600">
  `);

  instance.show();
}

Refs.gallery.addEventListener('click', onShowModal);
