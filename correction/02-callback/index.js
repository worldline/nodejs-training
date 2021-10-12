import { getDirContent } from './app/fs-utils.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Directory exists
getDirContent(join(__dirname, 'app'), (err, content) => {
  if(err) {
    console.log('getDirContent(\'app\') unexpected error', err.message);
  } else {
    console.log('getDirContent(\'app\'):', content);
  }
});

// Unknown repository, it returns an error
getDirContent(join(__dirname, 'app2'), (err, content) => {
  if(err) {
    console.log('getDirContent(\'app2\') unexpected error:', err.message);
  } else {
    console.log('getDirContent(\'app2\'):', content);
  }
});

// Path is a file
getDirContent(join(__dirname, 'package.json'), (err, content) => {
  if(err) {
    console.log('getDirContent(\'package.json\') unexpected error:', err.message);
  } else {
    console.log('getDirContent(\'package.json\'):', content);
  }
});