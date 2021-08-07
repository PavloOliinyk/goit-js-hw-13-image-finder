const BASE_URL = 'https://pixabay.com/api';
const KEY = '22797563-ef7ac6a65cc3c0715a95e250f';

export default class FetchImageApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchImage() {
    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  get query() {
    return this.page;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
