import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import FetchImageApi from './apiService';
import imageCardTemplate from '../templates/image-card.hbs';
import getRefs from './refs';
import { noticeError, noticeSuccess, setDefaultsDelay } from './notifications';
require('default-passive-events');
import * as basicLightbox from 'basiclightbox';

// import React, {Component} from 'react'
// import ScrollButton from 'react-scroll-button'

// class ScrollComponent extends Component {
//     render() {
//         return (
//             <ScrollButton 
//                 behavior={'smooth'} 
//                 buttonBackgroundColor={'red'}
//                 iconType={'arrow-up'}
//                 style= {{fontSize: '24px'}}
//             />
//         );
//     }
// }

// npm i react-scroll-button

setDefaultsDelay(2000);

const imageSearch = new FetchImageApi();
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '300px',
});
const Refs = getRefs();

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageSearch.query !== '') {
      imageSearch.fetchImage().then(images => {
        appendImagesMarkUp(images);
        imageSearch.incrementPage();
      });
    }
  });
}

function onSearch(e) {
  e.preventDefault();

  const query = e.currentTarget.elements.query.value;
  imageSearch.query = query;

  if (query === '') {
    noticeError();
    return;
  }

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
    observer.observe(Refs.sentinel);
  });
}

Refs.search.addEventListener('submit', onSearch);

function appendImagesMarkUp(images) {
  Refs.gallery.insertAdjacentHTML('beforeend', imageCardTemplate(images));
}

function clearImagesContainer() {
  Refs.gallery.innerHTML = '';
}

function onShowModal(e) {
  const target = e.target.tagName;
  const modalImage = e.target.dataset.source;

  if (target !== 'IMG') {
    return;
  }

  appendModalImage(modalImage);
}

Refs.gallery.addEventListener('click', onShowModal);

function appendModalImage(modalImage) {
  const instance = basicLightbox.create(`
      <img src=${modalImage} width="800" height="600">
  `);
  instance.show();
}
