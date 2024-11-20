// routes/report.js
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = (db) => {
    // Create new report
    router.post('/', isLoggedIn, (req, res) => {
        const { title, description } = req.body;
        db.query('INSERT INTO reports (user_id, title, description) VALUES (?, ?, ?)', [req.session.user.id, title, description], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/reports');
        });
    });

    // Retrieve all reports
    router.get('/reports', isLoggedIn, (req, res) => {
        db.query('SELECT id, title, description, created_at FROM reports WHERE user_id = ?', [req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('reports:', results);
            res.render('reports', { reports: results });
        });
    });

    // Edit report
    router.get('/edit/:id', isLoggedIn, (req, res) => {
        const { id } = req.params;
        db.query('SELECT id, title, description FROM reports WHERE id = ? AND user_id = ?', [id, req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                res.render('edit-report', { report: results[0] });
            } else {
                res.status(404).send('Report not found');
            }
        });
    });

    // Update report
    router.post('/edit/:id', isLoggedIn, (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        db.query('UPDATE reports SET title = ?, description = ? WHERE id = ? AND user_id = ?', [title, description, id, req.session.user.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/reports');
        });
    });

    // Delete report
    router.post('/delete/:id', isLoggedIn, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM reports WHERE id = ? AND user_id = ?', [id, req.session.user.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/reports');
        });
    });

    return router;
};

