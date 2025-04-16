const express = require('express');
const router = express.Router();
const { query } = require('../utils/db');

// Get all expenses grouped by category
router.get('/expenses', async (req, res, next) => {
    try {
        const result = await query(
            `SELECT category, SUM(amount), user_name FROM expense_data GROUP BY category, user_name`
        );

        const expenses = result.rows.map(row => ({
            user: row.user_name,
            category: row.category,
            amount: row.sum,
            color: "" // Default color
        }));

        res.json({
            status: 'success',
            data: expenses
        });
    } catch (error) {
        next(error);
    }
});

// Get all transactions
router.get('/transactions', async (req, res, next) => {
    try {
        const result = await query(
            `SELECT * FROM expense_data ORDER BY create_date DESC`
        );

        const transactions = result.rows.map(row => ({
            user: row.user_name,
            category: row.category,
            amount: row.amount,
            color: "",
            description: row.transaction_desc || "No description provided",
            date: row.create_date
        }));

        res.json({
            status: 'success',
            data: transactions
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router; 