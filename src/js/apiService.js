const BASE_URL = 'https://pixabay.com/api';
const KEY = '22797563-ef7ac6a65cc3c0715a95e250f';

function fetchImage(searchQuery, pageNumber) {
  pageNumber += 1;
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`,
  ).then(response => response.json());
}

export default fetchImage;
