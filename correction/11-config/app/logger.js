const { createLogger, format, transports } = require('winston');
const { combine, splat, simple } = format;
const config = require('config');

// Export winston instance, so we use the same for all logs
module.exports = createLogger({
    level: config.get('log.level'),
    format: combine(splat(), simple()),
    transports: [new transports.Console()]
});
