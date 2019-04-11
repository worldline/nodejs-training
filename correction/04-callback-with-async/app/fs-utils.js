const async = require('async');
const { basename, join } = require('path');
const fs = require('fs');

/**
 * Built an array of of absolute paths of files contained in a directory
 * @param {String} path - inspected absolute path
 * @param {getDirContent-CB} done - completion callback
 *
 * @callback getDirContent-CB
 * @param {Error} err - an optional error if path cannot be read as directory
 * @param {String[]} result - directory content.
 */
exports.getDirContent = (path, done) => {
  fs.readdir(path, (err, content) => {
    // an error happened
    if(err) {
      return done(err)
    }
    // readdir returns an array of file names, so use join to build absolute paths
    const result = content.map((fileName) => join(path, fileName));
    done(null, result);
  });
};

/**
 * Returns details on each items contained into a given directory
 * @param {String} path - inspected path
 * @param {getDirStat-CB} done - completion callback, invoked with parameters:
 *
 * @callback getDirStat-CB
 * @param {Error} err - an optional error if path cannot be read as directory
 * @param {Object[]} result - details of each element contained
 * @param {String} result.name - inspected item name
 * @param {String} result.path - inspected item path
 * @param {Boolean} result.isDirectory - file, directory or unknown nature of the item
 * @param {Number} result.size - item size in octets
 */
exports.getDirStat = (path, done) => {
  async.waterfall([
    // Retrieve list of files
    (next) => exports.getDirContent(path, next),
    // For each file, call fs.stat
    (files, next) => {
      async.map(files, (file, cb) => {
        fs.stat(file, (err, fileInfo) => {
          if(err) {
            return cb(err);
          }
          cb(null, {
            name: basename(file),
            path: file,
            isDirectory: fileInfo.isDirectory(),
            size: fileInfo.size
          });
        })
      }, next);
    }
  ], done)
};