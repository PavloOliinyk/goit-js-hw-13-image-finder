import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import FetchImageApi from './apiService';
import imageCardTemplate from '../templates/image-card.hbs';
import getRefs from './refs';
import appendModalImage from './basicLightBox';
import { noticeError, noticeSuccess, noticeInfo, setDefaultsDelay, noticeFetchTrouble } from './notifications';
require('default-passive-events');

setDefaultsDelay(2000);
const imageSearch = new FetchImageApi();
const observer = new IntersectionObserver(onEntry, {
  // rootMargin: '-100px',
  threshold: 0.2,
});
const Refs = getRefs();

Refs.search.addEventListener('submit', onSearch);
Refs.gallery.addEventListener('click', onShowModal);

function onSearch(e) {
  e.preventDefault();

  const query = e.currentTarget.elements.query.value;
  imageSearch.query = query;
  showDots('block');

  if (query === '') {
    noticeError();
    return;
  }

  imageSearch.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  imageSearch
    .fetchImage()
    .then(images => {
      if (images.length < 1) {
        showDots('none');
        noticeError();
        showFinalText();
        return;
      }

      appendImagesMarkUp(images);
      noticeSuccess();
      observer.observe(Refs.observer);
    })
    .catch(noticeFetchTrouble);
}

function appendImagesMarkUp(images) {
  Refs.gallery.insertAdjacentHTML('beforeend', imageCardTemplate(images));
}

function clearImagesContainer() {
  Refs.gallery.innerHTML = '';
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageSearch.query !== '') {
      imageSearch
        .fetchImage()
        .then(images => {
          if (images.length < 1) {
            showDots('none');
            noticeInfo();
            showFinalText();
            return;
          }

          appendImagesMarkUp(images);
          imageSearch.incrementPage();
        })
        .catch(noticeFetchTrouble);
    }
  });
}

function onShowModal(e) {
  const target = e.target.tagName;
  const modalImage = e.target.dataset.source;
  if (target !== 'IMG') {
    return;
  }

  appendModalImage(modalImage);
}

function showFinalText() {
  const markup = `<p class="page-status">End of content</p>
                  <p class="page-status">No more pages to load</p>`;

  document.body.insertAdjacentHTML('beforeend', markup);
}

function showDots(value) {
  Refs.dots.style.display = `${value}`;
}
