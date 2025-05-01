const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool({
    host: config.supabase.host,
    port: config.supabase.port,
    user: config.supabase.user,
    password: config.supabase.password,
    database: config.supabase.database,
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait for a connection
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Error executing query', { text, error });
        throw error;
    }
};

module.exports = {
    query,
    pool
}; 