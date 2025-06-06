import mongoose from 'mongoose';
import config from 'config';
import logger from './logger'; // Assuming you have a logger setup in config/logger.ts

const connectDB = async () => {
    try {
        // 1. Retrieve the nested database settings object from your config
        const dbSettings = config.get<{
            host: string;
            port: number;
            database: string;
            username: string;
            password: string;
        }>('settings.database');

        // 2. Destructure the settings for clarity
        const { host, port, database, username, password } = dbSettings;

        // 3. Construct the MongoDB connection URI
        // The `authSource=admin` is typically needed when the user is created in the admin database
        // but has permissions on another database. You can remove it if your setup differs.
        const mongoURI = `mongodb://${username}:${password}@${host}:${port}/${database}`;
        logger.debug(`Connecting to MongoDB at URI: ${mongoURI}`);

        // 4. Connect to the database using Mongoose
        const conn = await mongoose.connect(mongoURI);

        logger.info(`MongoDB Connected successfully to: ${conn.connection.host}`);

    } catch (error) {
        // 5. Log the error but DO NOT exit. Instead, re-throw the error.
        // This passes the error up to the calling function, allowing it to handle the shutdown.
        logger.error('Could not connect to MongoDB. The application will now shut down.');

        // Re-throw the original error to be caught by the caller in index.ts
        throw error;
    }
};

export default connectDB;