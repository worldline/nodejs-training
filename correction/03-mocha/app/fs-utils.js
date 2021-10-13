import { join } from 'path';
import { readdir } from 'fs';

/**
 * Built an array of of absolute paths of files contained in a directory
 * @param {String} path - inspected absolute path
 * @param {getDirContent-CB} done - completion callback
 *
 * @callback getDirContent-CB
 * @param {Error} err - an optional error if path cannot be read as directory
 * @param {String[]} result - directory content.
 */
export const getDirContent = (path, done) => {
  readdir(path, (err, content) => {
    // an error happened
    if(err) {
      return done(err)
    }
    // readdir returns an array of file names, so use join to build absolute paths
    const result = content.map((fileName) => join(path, fileName));
    done(null, result);
  });
};