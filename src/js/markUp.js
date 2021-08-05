// import countryCardTemplate from '../templates/country-card.hbs';
// import countriesListTemplate from '../templates/countries-list.hbs';
// import { noticeError, noticeProgress, noticeSuccess } from './notifications';
// import getRefs from './refs';
// const { countryContainer } = getRefs();

// function renderMarkup(countries) {
//   if (countries.length > 10) {
//     noticeError();
//     return;
//   }

//   if (countries.length >= 2 && countries.length <= 10) {
//     renderCountriesList(countries);
//     noticeProgress();
//     return;
//   }

//   renderCountryCard(countries);
//   noticeSuccess();
// }

// function renderCountryCard(countries) {
//   const countryCardMarkUp = countryCardTemplate(countries);
//   countryContainer.insertAdjacentHTML('beforeend', countryCardMarkUp);
// }

// function renderCountriesList(countries) {
//   const countriesList = countriesListTemplate(countries);
//   countryContainer.insertAdjacentHTML('beforeend', countriesList);
// }

// export default renderMarkup;
