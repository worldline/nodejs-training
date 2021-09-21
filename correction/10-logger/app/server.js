import { promisify } from 'util';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import express from 'express';
import exphbs from 'express-handlebars';
import expressWinston from 'express-winston';
import { getDirStat } from './fs-utils.js';
import logger from './logger.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Use handlebars for templates
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Logger with express-winston
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: false
}));

// Route to browse folder
app.get('/browse/:dirname', async (req, res, next) => {
  try {
    const content = await getDirStat(join(__dirname, '..', 'static', req.params.dirname));
    // Retrieve directory content
    const files = content.map(stat => ({
      name: stat.name,
      size: stat.size,
      isDirectory: stat.isDirectory
    }));
    // Return html
    if(req.accepts('html')) {
      res.render('browse', {
        dirname: req.params.dirname,
        files
      });
    } else {
    // Return JSON
      res.send(files);
    }
  } catch(err) {
    next(err);
  }
});

// Route to download a file
app.get('/download/:dirname/:filename', async (req, res, next) => {
  const filepath = join(__dirname, '..', 'static', req.params.dirname, req.params.filename)
  createReadStream(filepath)
    // manage errors that occurred while reading file (ex: file not found)
    .on('error', next)
    .pipe(res)
    // manage errors that occurred while writing to resp (ex: connection has been closed)
    .on('error', next);
});

// Error mapping
app.use((err, req, res, next) => {
  logger.error('an error occurred %s', err);
  // File not found
  if(err.code === 'ENOENT') {
    return res.status(404).send('no such file or directory');
  }
  // Use default error middleware for other errors
  next(err);
});

let server;

/**
 * Start server
 *
 * @return {Promise}
 */
export const start = promisify((done) => {
  server = app.listen(8080, done);
});

/**
 * Stop server
 *
 * @return {Promise}
 */
export const stop = promisify((done) => {
  server.close(done);
});