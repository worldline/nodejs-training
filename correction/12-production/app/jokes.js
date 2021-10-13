import got from 'got';

// HTTP agent to manage proxy
import caw from 'caw';

const agent = caw();

// Set default params
const httpRequest = got.extend({
  responseType: 'json',
  timeout: 1000,
  retry: 0,
  agent: {
    http: agent,
		https: agent,
    http2: agent
  }
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