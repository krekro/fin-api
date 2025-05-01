const express = require('express');
const router = express.Router();
const { query } = require('../utils/supabase');

router.post('/login', async (req, res, next) => {
    try {
        const user_name = req.body.user_name;
        const password = req.body.password;

        const result = await query(
            `SELECT * FROM exptrck_users WHERE user_name=$1 AND password=$2`,
            [user_name, password]
        );

        if (result.rows.length == 1) {
            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                uid: result.rows[0].uid,
                username: result.rows[0].user_name
            });
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router; 