// routes/info.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

module.exports = (db) => {
    // Get all info
    router.get('/', (req, res) => {
        db.query('SELECT * FROM info', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('info', { info: results });
        });
    });

    // Get info by ID
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM info WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                res.render('infoDetail', { info: results[0] });
            } else {
                res.status(404).send('Info not found');
            }
        });
    });

    // Create new info
    router.post('/', isAdmin, (req, res) => {
        const { title, type, link, short_description } = req.body;
        db.query('INSERT INTO info (title, type, link, short_description) VALUES (?, ?, ?, ?)', [title, type, link, short_description], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/info');
        });
    });

    // Update info
    router.put('/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        const { title, type, link, short_description } = req.body;
        db.query('UPDATE info SET title = ?, type = ?, link = ?, short_description = ? WHERE id = ?', [title, type, link, short_description, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/info');
        });
    });

    // Delete info
    router.delete('/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM info WHERE id = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/info');
        });
    });

    return router;
};
