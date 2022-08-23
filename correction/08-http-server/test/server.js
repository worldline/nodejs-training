import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const { expect } = chai;
chai.use(chaiAsPromised);
import got from 'got';
import { start, stop } from '../app/server.js';

// got instance for test
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

describe('HTTP server', () => {
  // Start server before tests
  before(() => start());
  // Stop server after tests
  after(() => stop());

  it('should return a 404 if path doesn\'t exist', async () => {
    // Request GET /foo
    const resp = await httpRequest('http://127.0.0.1:8080');

    // Check status
    expect(resp).to.have.property('statusCode').that.equals(404);
  });

  describe('/browse route', () => {
    it('should return the content of the folder /quentin', async () => {
      // Request GET /foo
      const resp = await httpRequest('http://127.0.0.1:8080/browse/quentin');

      // Check status
      expect(resp).to.have.property('statusCode').that.equals(200);
      expect(resp).to.have.property('body').that.have.deep.members([{
        name: 'bar.txt',
        size: 11,
        isDirectory: false
      }, {
        name: 'foo.txt',
        size: 28,
        isDirectory: false
      }]);
    });

    it('should return an error 404 if folder doesn\'t exist', async () => {
      // Request GET /foo
      const resp = await httpRequest('http://127.0.0.1:8080/browse/patrick');

      // Check status
      expect(resp).to.have.property('statusCode').that.equals(404);
      expect(resp).to.have.property('body').that.equals('no such file or directory');
    });

    it('should return the content of the folder /quentin in html', async () => {
      // Request GET /foo
      const resp = await httpRequest('http://127.0.0.1:8080/browse/quentin', {
        responseType: 'text',
        headers: {
          accept: 'text/html'
        }
      });

      // Check status
      expect(resp).to.have.property('statusCode').that.equals(200);
      expect(resp).to.have.nested.property('headers.content-type').that.include('text/html');
      expect(resp).to.have.property('body').that.includes('<h1>Contenu de quentin</h1>');
      expect(resp).to.have.property('body').that.includes('<li>bar.txt (11B)</li>');
      expect(resp).to.have.property('body').that.includes('<li>foo.txt (28B)</li>');
    });
  });
});