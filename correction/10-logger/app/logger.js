const { createLogger, format, transports } = require('winston');
const { combine, splat, simple } = format;

// Export winston instance, so we use the same for all logs
module.exports = createLogger({
    level: 'debug',
    format: combine(splat(), simple()),
    transports: [new transports.Console()]
});
