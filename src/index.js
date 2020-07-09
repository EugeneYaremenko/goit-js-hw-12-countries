import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import './js/services/fetchCountries';
import searchCountries from './js/services/fetchCountries';
import countrySearchSuccessTemplate from './templates/countries-search-face-success.hbs';
import countrySearchFailTemplate from './templates/countries-search-face-fail.hbs';

const { alert, notice, info, success, error } = require('@pnotify/core');

const debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('#searchInput'),
  searchForm: document.querySelector('#searchForm'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(searchFormInputHeandler, 1000),
);

function searchFormInputHeandler(event) {
  let name = event.target.value;
  refs.searchForm.innerHTML = '';

  searchCountries.fetchCountries(name).then(data => {
    if (data.length > 10) {
      return error(
        'Too many matches found. Please enter a more specific query!',
      );
    }

    if (data.length > 1 && data.length < 10) {
      const murkup = data
        .map(country => countrySearchFailTemplate(country))
        .join('');

      return refs.searchForm.insertAdjacentHTML('beforeend', murkup);
    }

    const murkup = data
      .map(country => countrySearchSuccessTemplate(country))
      .join('');

    refs.searchForm.insertAdjacentHTML('beforeend', murkup);
  });
}
