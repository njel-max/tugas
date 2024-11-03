const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db');

// Landing page route 
router.get('/', (req, res) => { res.render('landing'); 
});

// Rute untuk halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Login User
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        req.session.user = user; res.redirect('/dashboard');
    });
});

// Rute untuk halaman register
router.get('/register', (req, res) => {
    res.render('register');
});


// Add New User
router.post('/register', async (req, res) => { const { username, password, role } = req.body; if (!username || !password || !role) { return res.status(400).json({ message: 'Please fill in all fields' }); } const hashedPassword = await bcrypt.hash(password, 10); db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, results) => { if (err) throw err; res.redirect('/login'); 

});
});

// Edit User
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    db.query('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, hashedPassword, role, id], (err, results) => {
        if (err) throw err;
        res.status(200).json({ message: 'User updated' });
    });
});

// Delete User
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(200).json({ message: 'User deleted' });
    });
});

// Logout User
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.redirect('/login');
    });
});

// Dashboard User
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('dashboard', { user: req.session.user });
});


module.exports = router;
