import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import FetchImageApi from './apiService';
import imageCardTemplate from '../templates/image-card.hbs';
import getRefs from './refs';
import appendModalImage from './basicLightBox';
import {
  noticeError,
  noticeSuccess,
  noticeInfo,
  setDefaultsDelay,
  noticeFetchTrouble,
} from './notifications';
require('default-passive-events');

setDefaultsDelay(2000);
const imageSearch = new FetchImageApi();
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '250px',
  // threshold: 0.2,
});
const Refs = getRefs();

Refs.search.addEventListener('submit', onSearch);
Refs.gallery.addEventListener('click', onShowModal);

function onSearch(e) {
  e.preventDefault();

  const query = e.currentTarget.elements.query.value;
  imageSearch.query = query;
  showDots('block');
  clearPageLimitStatus();
  if (query === '') {
    noticeError();
    return;
  }

  imageSearch.resetPage();
  clearImagesContainer();
  fetchImages();
}

async function fetchImages() {
  try {
    const fetchResult = await imageSearch.fetchImage();

    // if (fetchResult.length < 1) {
    //   showDots('none');
    //   noticeInfo();
    //   showFinalText();
    //   return;
    // }

    appendImagesMarkUp(fetchResult);
    // setTimeout(lazyLoad, 250);
    lazyLoad();
    noticeSuccess();
    observer.observe(Refs.observer);
  } catch (error) {
    console.error(error);
    noticeFetchTrouble();
  }
}

function appendImagesMarkUp(images) {
  Refs.gallery.insertAdjacentHTML('beforeend', imageCardTemplate(images));
}

function clearImagesContainer() {
  Refs.gallery.innerHTML = '';
}

function clearPageLimitStatus() {
  Refs.pageLimitMessage.innerHTML = '';
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
            observer.unobserve(Refs.observer);
            return;
          }

          appendImagesMarkUp(images);
          // setTimeout(lazyLoad, 250);
          console.time(lazyLoad);
          lazyLoad();
          console.timeEnd(lazyLoad);
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

  Refs.pageLimitMessage.insertAdjacentHTML('beforeend', markup);
}

function showDots(value) {
  Refs.dots.style.display = `${value}`;
}

function lazyLoad() {
  const cardImages = document.querySelectorAll('.fetch');

  cardImages.forEach(image => {
    image.src = image.dataset.src;
    image.classList.remove('fetch');

    image.addEventListener('load', () => {
      image.classList.add('is-loaded');
    });
  });
}
