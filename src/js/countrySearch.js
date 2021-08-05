// import '../sass/main.scss';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import fetchCountries from './fetchCountries';
// import renderMarkup from './markUp';
// import getRefs from './refs';
// import { noticeIncorrect, setDefaultsDelay } from './notifications';
// var debounce = require('lodash.debounce');
// require('default-passive-events');

// const { input, countryContainer } = getRefs();
// setDefaultsDelay(1500);

// function onSearch(e) {
//   countryContainer.innerHTML = '';
//   const searchQuery = e.target.value;

//   fetchCountries(searchQuery)
//     .then(countries => {
//       if (countries.status === 404) {
//         noticeIncorrect();
//         return;
//       }

//       renderMarkup(countries);
//     })
//     .catch(() => {
//       countryContainer.innerHTML = '';
//       noticeIncorrect();
//     });
// }

// input.addEventListener('input', debounce(onSearch, 500));
