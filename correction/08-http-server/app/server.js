const { promisify } = require('util')
const { join } = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const morgan = require('morgan');
const { getDirStat } = require('./fs-utils');

const app = express();

// Use handlebars for templates
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Logger with morgan
app.use(morgan('tiny'));

// Route to browse folder
app.get('/browse/:dirname', async (req, res, next) => {
  try {
    const content = await getDirStat(join(__dirname, '..', 'static', req.params.dirname));
    // Retrive directory content
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

// Error mapping
app.use((err, req, res, next) => {
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
  server = app.listen(8080, done);
});

/**
 * Stop server
 *
 * @return {Promise}
 */
module.exports.stop = promisify((done) => {
  server.close(done);
});