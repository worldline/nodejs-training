const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromised);
const nock = require('nock');
const { getJoke } = require('../app/jokes');

describe('Jokes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('getJoke()', () => {
    it('should get a joke when API returns a valid response', async () => {
      // Stub API
      const stub = nock('https://api.icndb.com')
        .get('/jokes/random')
        .query({ firstName: 'Quentin'})
        .reply(200, {
          type: 'success',
          value: {
            id: 470,
            joke: 'Chuck Norris doesn\'t bug hunt as that signifies a probability of failure, he goes bug killing.',
            categories: ['nerdy']
          }
        });

      const joke = await getJoke();
      // Check stub has been called
      stub.done();
      // Check joke
      expect(joke).to.equal('Chuck Norris doesn\'t bug hunt as that signifies a probability of failure, ' +
        'he goes bug killing.');
    });

    it('should throw an error if API is unavailable', () => {
      // Stub API
      nock('https://api.icndb.com')
        .get('/jokes/random')
        .query({ firstName: 'Quentin'})
        .replyWithError(new Error('ETIMEDOUT'));

      return expect(getJoke()).to.be.rejectedWith('ETIMEDOUT');
    });
  });
});