require('dotenv').config();

const config = {
    port: process.env.PORT || 4000,
    database: {
        host: process.env.POSTGRES_HOST || process.env.DB_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || process.env.DB_PORT || 5432,
        user: process.env.POSTGRES_USER || process.env.DB_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.POSTGRES_DATABASE || process.env.DB_NAME || 'fin-tracker',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    }
};

module.exports = config;