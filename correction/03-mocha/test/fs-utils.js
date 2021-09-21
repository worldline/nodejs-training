import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect } from 'chai';
import { getDirContent } from '../app/fs-utils.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

describe('FS utils', () => {
  describe('getDirContent()', () => {
    it('should return the content of an existing directory', (done) => {
      getDirContent(join(__dirname, 'fixtures'), (err, content) => {
        expect(err).to.not.exist;
        expect(content).to.be.an.instanceOf(Array).that.has.lengthOf(2);
        expect(content).to.include(join(__dirname, 'fixtures', 'bar'));
        expect(content).to.include(join(__dirname, 'fixtures', 'foo'));
        done();
      });
    });

    it('should return an error if path doesn\'t exist', (done) => {
      getDirContent(join(__dirname, 'unknown'), (err) => {
        expect(err).to.exist.and.to.have.property('code').that.include('ENOENT');
        done();
      });
    });

    it('should return an error if path is not a directory', (done) => {
      getDirContent(join(__dirname, 'fs-utils.js'), (err) => {
        expect(err).to.exist.and.to.have.property('code').that.include('ENOTDIR');
        done();
      });
    });
  });
});