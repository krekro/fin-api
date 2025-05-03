const express = require('express');
const router = express.Router();
const { sbquery } = require('../utils/supabase');
const { v7 } = require('uuid')

function createSessionID(){
    return v7();
}

router.post('/login', async (req, res, next) => {
    try {
        const user_name = req.body.user_name;
        const password = req.body.password;
        const session_id = createSessionID();

        const result = await sbquery(
            `UPDATE exptrck_users SET user_session=$1 WHERE user_name=$2 AND password=$3 RETURNING uid, user_name, user_session`,
            [session_id, user_name, password]
        );

        if (result.rows.length == 1) {
            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                uid: result.rows[0].uid,
                username: result.rows[0].user_name,
                session_id: result.rows[0].user_session
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