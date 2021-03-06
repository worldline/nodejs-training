const { basename, join } = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const logger = require('./logger');

/**
 * Built an array of of absolute paths of files contained in a directory
 * @param {String} path - inspected absolute path
 *
 * @return {Promise<String[]>} - directory content.
 */
exports.getDirContent = async (path) => {
  logger.debug('start getDirContent of %s', path);
  const content = await readdir(path);
  return content.map((fileName) => join(path, fileName));
};

/**
 * Returns details on each items contained into a given directory
 * @param {String} path - inspected path
 *
 * @return {Promise<Object[]>} result - details of each element contained
 * @param {String} result.name - inspected item name
 * @param {String} result.path - inspected item path
 * @param {Boolean} result.isDirectory - file, directory or unknown nature of the item
 * @param {Number} result.size - item size in octets
 */
exports.getDirStat = async (path) => {
  logger.debug('start getDirStat of %s', path);
  const stat = promisify(fs.stat);

  // Get list of files
  const files = await exports.getDirContent(path);

  // Call fs.stat for each file
  const stats = await Promise.all(files.map(file => stat(file)));

  // Build result
  return stats.map((fileInfo, i) => ({
      name: basename(files[i]),
      path: files[i],
      isDirectory: fileInfo.isDirectory(),
      size: fileInfo.size
    }));
};