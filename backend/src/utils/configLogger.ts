import util from 'util';
import logger from '../config/logger';
/**
 * A list of sensitive keys whose values should be redacted from logs.
 * Used by {@link sanitizeConfig} to identify sensitive configuration fields.
 */
const SENSITIVE_KEYS = ['password', 'secret', 'token', 'apiKey', 'privateKey'];

/**
 * Recursively clones and sanitizes a configuration object by redacting sensitive values.
 *
 * @template T - The type of the configuration object.
 * @param obj - The configuration object to sanitize.
 * @returns A deep-cloned object with sensitive values replaced by '[SANITEZED]'.
 *
 * @remarks
 * This function performs a deep clone of the input object and replaces the values
 * of any keys that match entries in the {@link SENSITIVE_KEYS} list (case-insensitive)
 * with the string '[SANITEZED]'. Nested objects are sanitized recursively.
 */
export function sanitizeConfig<T extends object>(obj: T): T {
    const clonedObj = JSON.parse(JSON.stringify(obj)); // Simple deep clone

    for (const key in clonedObj) {
        if (typeof clonedObj[key] === 'object' && clonedObj[key] !== null) {
            // If the value is an object, recurse
            clonedObj[key] = sanitizeConfig(clonedObj[key]);
        } else if (SENSITIVE_KEYS.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey))) {
            // If the key is sensitive, redact its value
            clonedObj[key] = '[SANITEZED]';
        }
    }
    return clonedObj;
}

/**
 * Logs the application's configuration to the console, redacting sensitive values in production.
 *
 * @param config - The configuration object to log. Must have a `util.toObject()` method.
 *
 * @remarks
 * In production, sensitive values (as determined by {@link SENSITIVE_KEYS}) are redacted
 * before logging. In other environments, the full configuration is logged for debugging.
 * Uses Node.js `util.inspect` for pretty-printing nested objects.
 */
export function configLogger(config: {util: {toObject: () => object}}): void {
    const printLines = (obj: object) => {
        const lines = util.inspect(obj, { showHidden: false, depth: null, colors: false }).split('\n');
        for (const line of lines) {
            logger.info(line);
        }
    };
    if (process.env['NODE_ENV'] === 'production') {
        logger.info('--- Initializing with Final (Sanitized) Configuration ---');
        const sanitizedConfigForLogging = sanitizeConfig(config.util.toObject());
        printLines(sanitizedConfigForLogging);
        logger.info('------------------------------------------------------');
    } else {
        logger.info('--- Initializing with Final Configuration ---');
        const finalConfig = config.util.toObject();
        printLines(finalConfig);
        logger.info('-------------------------------------------');
    }
}