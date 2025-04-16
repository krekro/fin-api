const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const errorHandler = require('./src/middleware/errorHandler');
const expenseRoutes = require('./src/routes/expenseRoutes');

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

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

module.exports = app;