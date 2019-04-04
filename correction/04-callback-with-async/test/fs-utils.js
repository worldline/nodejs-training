const fs = require('fs');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const { getDirContent, getDirStat } = require('../app/fs-utils');

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

  describe('getDirStat()', () => {
    afterEach(() => sinon.restore());

    it('should return the content of an existing directory', (done) => {
      getDirStat(join(__dirname, 'fixtures'), (err, content) => {
        expect(err).to.not.exist;
        expect(content).to.be.an.instanceOf(Array).that.has.lengthOf(2);
        expect(content).to.have.deep.members([{
          name: 'foo',
          path: join(__dirname, 'fixtures', 'foo'),
          isDirectory: false,
          size: 0
        }, {
          name: 'bar',
          path: join(__dirname, 'fixtures', 'bar'),
          isDirectory: false,
          size: 0
        }])
        done();
      });
    });

    it('should return an error if path doesn\'t exist', (done) => {
      getDirStat(join(__dirname, 'unknown'), (err) => {
        expect(err).to.exist.and.to.have.property('code').that.include('ENOENT');
        done();
      });
    });

    it('should return an error if fs.stat returns an error', (done) => {
      sinon.replace(fs, 'stat', sinon.fake.yields(new Error('an unexpected error occurred')));

      getDirStat(join(__dirname, 'fixtures'), (err) => {
        expect(err).to.exist.and.to.have.property('message').that.equal('an unexpected error occurred');
        done();
      });
    });
  });
});