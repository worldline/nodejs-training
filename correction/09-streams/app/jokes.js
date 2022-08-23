import got from 'got';

// Set default params
const httpRequest = got.extend({
  responseType: 'json',
  timeout: {
    request: 1000
  },
  retry: {
    limit: 0
  },
  throwHttpErrors: false // Don't throw an error on 404
});

/**
 * Return a Chuck-Norris from ICNDB API
 *
 * @return {String}
 */
export const getJoke = async () => {
  const { body } = await httpRequest('https://api.icndb.com/jokes/random', {
    searchParams: {
      firstName: 'Quentin'
    }
  });
  return body.value.joke;
};