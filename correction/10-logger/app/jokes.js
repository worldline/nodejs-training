const got = require('got');

// HTTP agent to manage proxy
const caw = require('caw');

// Set default params
const httpRequest = got.extend({
  json: true,
  timeout: 1000,
  retry: 0,
  agent: caw()
});

/**
 * Return a Chuck-Norris from ICNDB API
 *
 * @return {String}
 */
module.exports.getJoke = async () => {
  const { body } = await httpRequest('https://api.icndb.com/jokes/random', {
    query: {
      firstName: 'Quentin'
    }
  });
  return body.value.joke;
};