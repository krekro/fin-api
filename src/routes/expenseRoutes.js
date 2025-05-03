const express = require('express');
const router = express.Router();
const { query } = require('../utils/db');
const { validateSession } = require('../services/session')

// Get monthly expenses grouped by category
router.get('/expenses', async (req, res, next) => {
    try {
        const user_name  = req.query.user_name;
        const session_id  = req.query.session_id;
        const isValid = await validateSession(session_id, user_name)
        if(isValid==true){       
            const result = await query(
            `SELECT category, SUM(amount), user_name FROM expense_data WHERE EXTRACT(MONTH from create_date)=EXTRACT(MONTH from CURRENT_DATE) AND user_name='${user_name}' GROUP BY category, user_name`
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
            });}
            else{
                throw new Error("Invalid Session")
            }
    
    } catch (error) {
        next(error);
    }
});

// Get monthly transactions
router.get('/transactions', async (req, res, next) => {
    try {
        const user_name = req.query.user_name;
        const session_id = req.query.session_id;
        const isValid = await validateSession(session_id, user_name)
        if(isValid){
            const result = await query(
            `SELECT * FROM expense_data where user_name='${user_name}' ORDER BY create_date DESC`
            );

            const transactions = result.rows.map(row => ({
                payment_id: row.payment_id,
                user_name: row.user_name,
                category: row.category,
                amount: row.amount,
                color: "",
                description: row.transaction_desc || "No description provided",
                date: row.create_date.toISOString().split('T')[0] // Format date to YYYY-MM-DD
            }));

            res.json({
                status: 'success',
                data: transactions
            });
        }
        else{
            throw new Error("Invalid Session")
        }
    } catch (error) {
        next(error);
    }
});

// Add a new transaction
router.post('/create-transaction', async (req, res, next) => {
    try {
        const isValid = validateSession(req.body.session_id, req.body.user_name);
        if(isValid){
             const result = await query(
                `INSERT INTO expense_data (payment_id, user_name, category, amount, create_date, transaction_desc) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [req.body.payment_id, req.body.user_name, req.body.category, req.body.amount, req.body.create_date, req.body.transaction_desc]
            );
            const transaction = result.rows[0];
            res.json({
                status: 'success',
                data: {
                    payment_id: transaction.payment_id,
                    user: transaction.user_name,
                    category: transaction.category,
                    amount: transaction.amount,
                    date: transaction.create_date,
                    description: transaction.transaction_desc || "No description provided"

                }
            });
        }
    }
    catch (error) {
        next(error);
    }
});

module.exports = router; 