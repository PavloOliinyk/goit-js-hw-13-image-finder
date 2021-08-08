export default function getRefs() {
  return {
    search: document.querySelector('#search-form'),
    gallery: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('#load-more'),
  };
}
