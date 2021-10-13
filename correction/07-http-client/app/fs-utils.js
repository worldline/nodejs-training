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
export const getDirContent = async (path) => {
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
export const getDirStat = async (path) => {
  const stat = promisify(fs.stat);

  // Get list of files
  const files = await getDirContent(path);

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