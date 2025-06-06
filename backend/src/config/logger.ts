import pino from 'pino';
import config from 'config';
const Sentry = require('@sentry/node');

// Get logger configuration from config files
const loggerConfig = config.get('settings.logger') as pino.LoggerOptions;

const logger = pino(loggerConfig);

// Forward all logs to Sentry as breadcrumbs, and errors as events
const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
levels.forEach(level => {
  const orig = logger[level];
  logger[level] = function (...args: [string, ...any[]]) {
    orig.call(logger, ...args);
    const msg = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ');
    // Send as breadcrumb
    Sentry.addBreadcrumb({
      category: 'log',
      level: level === 'fatal' ? 'error' : level,
      message: msg,
    });
    // Send as event for error/fatal
    if (level === 'error' || level === 'fatal') {
      if (typeof args[0] === 'object' && args[0] !== null && args[0] instanceof Error) {
        Sentry.captureException(args[0]);
      } else {
        Sentry.captureMessage(msg, 'error');
      }
    }
  } as typeof logger[typeof level];
});

export default logger;