const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const errorHandler = require('./src/middleware/errorHandler');
const expenseRoutes = require('./src/routes/expenseRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors(config.cors));

// Routes
app.get('/status', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api', expenseRoutes);
app.use('/user', userRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log(`Database host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`Database name: ${process.env.DB_NAME || 'fin-tracker'}`);
    console.log(`SSL mode: ${process.env.DB_SSLMODE}`);
    console.log(`Supabase host: ${process.env.SUPA_HOST}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

module.exports = app;