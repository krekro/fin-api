require('dotenv').config();

const config = {
    port: process.env.PORT || 4000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        //allowedHeaders: ['Content-Type', 'Authorization'],
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    }
};

module.exports = config; 