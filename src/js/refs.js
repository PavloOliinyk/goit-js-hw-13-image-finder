export default function getRefs() {
  return {
    search: document.querySelector('#search-form'),
    gallery: document.querySelector('.js-gallery'),
    observer: document.querySelector('#observer'),
    dots: document.querySelector('.page-load-status'),
    pageLimitMessage: document.querySelector('#js-page-status__wrapper'),
  };
}
