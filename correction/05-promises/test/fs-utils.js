import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chai from 'chai';
const { expect } = chai;
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import { getDirContent, getDirStat } from '../app/fs-utils.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

describe('FS utils', () => {
  describe('getDirContent()', () => {
    it('should return the content of an existing directory', () => {
      return expect(getDirContent(join(__dirname, 'fixtures'))).to.eventually.be.an.instanceOf(Array)
        .that.have.members([
          join(__dirname, 'fixtures', 'bar'),
          join(__dirname, 'fixtures', 'foo')
        ]);
    });

    it('should return an error if path doesn\'t exist', () => {
      return expect(getDirContent(join(__dirname, 'unknown'))).to.be.rejectedWith(/NOENT/);
    });

    it('should return an error if path is not a directory', () => {
      return expect(getDirContent(join(__dirname, 'fs-utils.js'))).to.be.rejectedWith(/ENOTDIR/);
    });
  });

  describe('getDirStat()', () => {
    afterEach(() => sinon.restore());

    it('should return the content of an existing directory', () => {
      return expect(getDirStat(join(__dirname, 'fixtures'))).to.eventually.be.an.instanceOf(Array)
        .that.have.deep.members([{
          name: 'foo',
          path: join(__dirname, 'fixtures', 'foo'),
          isDirectory: false,
          size: 0
        }, {
          name: 'bar',
          path: join(__dirname, 'fixtures', 'bar'),
          isDirectory: false,
          size: 0
        }]);
      });

    it('should return an error if path doesn\'t exist', () => {
      return expect(getDirStat(join(__dirname, 'unknown'))).to.be.rejectedWith(/NOENT/);
    });

    it('should return an error if fs.stat returns an error', () => {
      sinon.replace(fs, 'stat', sinon.fake.yields(new Error('an unexpected error occurred')));

      return expect(getDirStat(join(__dirname, 'fixtures'))).to.be.rejectedWith(/an unexpected error occurred/);
    });
  });
});