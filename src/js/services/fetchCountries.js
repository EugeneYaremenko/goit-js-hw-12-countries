const { alert, notice, info, success, error } = require('@pnotify/core');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchCountries(searchQuery) {
    return fetch(baseUrl + searchQuery)
      .then(responce => responce.json())
      .catch(
        error(
          'The connection to the server is lost. Try using the service later.',
        ),
      );
  },
};
