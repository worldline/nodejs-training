import config from 'config';
import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, splat, simple } = format;

// Export winston instance, so we use the same for all logs
export default createLogger({
    level: config.get('log.level'),
    format: combine(splat(), simple()),
    transports: [new transports.Console()]
});
