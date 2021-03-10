const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromised);
const got = require('got');

// got instance for test
const httpRequest = got.extend({
  timeout: 1000,
  retry: 0,
  throwHttpErrors: false // Don't throw an error on 404
});
const server = require('../app/server');

describe('HTTP server', () => {
  // Start server before tests
  before(() => server.start());
  // Stop server after tests
  after(() => server.stop());

  it('should return a 404 if path doesn\'t exist', async () => {
    // Request GET /foo
    const resp = await httpRequest('http://127.0.0.1:8080');

    // Check status
    expect(resp).to.have.property('statusCode').that.equals(404);
  });

  describe('/browse route', () => {
    it('should return the content of the folder /quentin', async () => {
      // Request GET /foo
      const resp = await httpRequest('http://127.0.0.1:8080/browse/quentin', { responseType: 'json' });

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
        headers: {
          accept: 'text/html'
        }
      });

      // Check status
      expect(resp).to.have.property('statusCode').that.equals(200);
      expect(resp).to.have.nested.property('headers.content-type').that.include('text/html');
      expect(resp).to.have.property('body').that.includes('<h1>Contenu de quentin</h1>');
      expect(resp).to.have.property('body').that
        .includes('<li><a href="/download/quentin/bar.txt">bar.txt</a> (11B)</li>');
      expect(resp).to.have.property('body').that.includes('<li><a href="/download/quentin/foo.txt">foo.txt</a>');
    });
  });

  describe('/download route', () => {
    it('should return the content of the file /quentin/foo.txt', async () => {
      // Request GET /foo
      const resp = await httpRequest('http://127.0.0.1:8080/download/quentin/foo.txt');

      // Check status
      expect(resp).to.have.property('statusCode').that.equals(200);
      expect(resp).to.have.property('body').that.equals('je suis foo (comme Afflelou)');
    });

    it('should return an error 404 if folder doesn\'t exist', async () => {
      // Request GET /foo
      const resp = await httpRequest('http://127.0.0.1:8080/download/quentin/unknown.txt');

      // Check status
      expect(resp).to.have.property('statusCode').that.equals(404);
      expect(resp).to.have.property('body').that.equals('no such file or directory');
    });
  });
});