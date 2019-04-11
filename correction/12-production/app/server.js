const { promisify } = require('util')
const { join } = require('path');
const { createReadStream } = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');
const expressWinston = require('express-winston');
const { getDirStat } = require('./fs-utils');
const logger = require('./logger');
const config = require('config');

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
module.exports.start = promisify((done) => {
  server = app.listen(config.get('port'), done);
});

/**
 * Stop server
 *
 * @return {Promise}
 */
module.exports.stop = promisify((done) => {
  server.close(done);
});