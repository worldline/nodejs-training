const fs = require('fs');
const { join } = require('path');
const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const { getDirContent, getDirStat } = require('../app/fs-utils');

describe('FS utils', () => {
  describe('getDirContent()', () => {
    it('should return the content of an existing directory', async () => {
      const files = await getDirContent(join(__dirname, 'fixtures'));
      expect(files).to.be.an.instanceOf(Array).that.have.members([
        join(__dirname, 'fixtures', 'bar'),
        join(__dirname, 'fixtures', 'foo')
      ]);
    });

    it('should return an error if path doesn\'t exist', () => {
      return expect(getDirContent(join(__dirname, 'unknown'))).to.be.rejectedWith(/NOENT/);
    });

    it('should return an error if path is not a directory', async () => {
      // Another way to check that an error has been thrown
      try {
        await getDirContent(join(__dirname, 'fs-utils.js'));
        expect.fail('an error should have be thrown')
      } catch(err) {
        expect(err).to.exist.and.to.have.property('code').that.include('ENOTDIR');
      }
    });
  });

  describe('getDirStat()', () => {
    afterEach(() => sinon.restore());

    it('should return the content of an existing directory', async () => {
      const files = await getDirStat(join(__dirname, 'fixtures'));
      expect(files).to.be.an.instanceOf(Array).that.have.deep.members([{
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