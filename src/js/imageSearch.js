import FetchImageApi from './apiService';
import imageCardTemplate from '../templates/image-card.hbs';

const imageSearch = new FetchImageApi();

const Refs = {
  search: document.querySelector('#search-form'),
  gallery: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('#load-more'),
};

function onSearch(e) {
  e.preventDefault();

  imageSearch.query = e.currentTarget.elements.query.value;
  imageSearch.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  imageSearch.fetchImage().then(imagesMarkUp);
}

function onLoadMoreImages() {
  imageSearch.fetchImage().then(imagesMarkUp);
}

Refs.search.addEventListener('submit', onSearch);
Refs.loadMoreBtn.addEventListener('click', onLoadMoreImages);

function imagesMarkUp(images) {
  Refs.gallery.insertAdjacentHTML('beforeend', imageCardTemplate(images));
}

function clearImagesContainer() {
  Refs.gallery.innerHTML = '';
}
