require('./instrument.js'); // Importing the instrumentation module first

import config from 'config';
import util from 'util';
import { configLogger } from './utils/configLogger';
import connectDB from './config/db';
import logger from './config/logger';

const Sentry = require("@sentry/node");
const express = require('express');
import type { Request, Response, NextFunction } from 'express';

const app = express();

app.get("/", function rootHandler(req: Request, res: Response) {
    logger.info('Received request at root endpoint');
    res.end("Hello world!");
});

app.get("/debug-sentry", function mainHandler(req: Request, res: Response) {
    logger.info('Debugging Sentry error handler...');
    throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err: any, req: Request, res: Response, next: NextFunction) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(((res as any).sentry) + "\n");
});

app.listen(3000);

async function server() {
    logger.info('Starting backend server...');
    logger.info(`Server started in ${(process.env['NODE_ENV'] || 'unknown')} mode`);
    configLogger(config);

    try {
        // Connect to the database
        await connectDB();
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Database connection failed. Shutting down the server...');
        logger.error('Error details:', error);
    }
    logger.info('Exiting backend server...');
    process.exit(0);
}

