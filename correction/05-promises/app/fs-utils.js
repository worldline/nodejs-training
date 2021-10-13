import { basename, join } from 'path';
import fs from 'fs';
import { promisify } from 'util';
const readdir = promisify(fs.readdir);

/**
 * Built an array of of absolute paths of files contained in a directory
 * @param {String} path - inspected absolute path
 *
 * @return {Promise<String[]>} - directory content.
 */
export const getDirContent = (path) => {
  return readdir(path)
    .then((content) => {
      return content.map((fileName) => join(path, fileName));
    });
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
export const getDirStat = (path) => {
  let fileList;
  const stat = promisify(fs.stat);

  // Get list of files
  return getDirContent(path)
    .then((files) => {
      fileList = files;
      return Promise.all(files.map(file => stat(file)))
    })
    // Build result
    .then((stats) => {
      return stats.map((fileInfo, i) => ({
        name: basename(fileList[i]),
        path: fileList[i],
        isDirectory: fileInfo.isDirectory(),
        size: fileInfo.size
      }));
    });
};