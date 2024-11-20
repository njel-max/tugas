// routes/profile.js
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = (db) => {
    // Retrieve user profile
    router.get('/', isLoggedIn, (req, res) => {
        db.query('SELECT username, email, created_at FROM users WHERE id = ?', [req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                res.render('profile', { user: results[0] });
            } else {
                res.status(404).send('User not found');
            }
        });
    });

    // Update user profile
    router.post('/edit', isLoggedIn, (req, res) => {
        const { username, email } = req.body;
        db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, req.session.user.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/profile');
        });
    });

    return router;
};
