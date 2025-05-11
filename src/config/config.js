require('dotenv').config();

const config = {
    port: process.env.PORT || 4000,
    database: {
        host: process.env.POSTGRES_HOST || process.env.DB_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || process.env.DB_PORT || 5432,
        user: process.env.POSTGRES_USER || process.env.DB_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.POSTGRES_DATABASE || process.env.DB_NAME || 'fin-tracker',
        sslmode: process.env.DB_SSLMODE || 'require'
    },
        supabase: {
        host: process.env.SUPA_HOST,
        port: process.env.SUPA_PORT,
        user: process.env.SUPA_USER, 
        password: process.env.SUPA_PASSWORD,
        database: process.env.SUPA_DB,
        sslmode: process.env.SUPA_SSLMODE
    },
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    }
};

module.exports = config;