// routes/admin.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

module.exports = (db) => {
    // Get all reports
    router.get('/reports', isAdmin, (req, res) => {
        db.query('SELECT * FROM reports', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('admin/reports', { reports: results });
        });
    });

    // Get report by ID
    router.get('/reports/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM reports WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                res.render('admin/reportDetail', { report: results[0] });
            } else {
                res.status(404).send('Report not found');
            }
        });
    });

    // Update report status
    router.put('/reports/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        db.query('UPDATE reports SET status = ? WHERE id = ?', [status, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect(`/admin/reports/${id}`);
        });
    });

    // CRUD routes for info
    router.get('/info', isAdmin, (req, res) => {
        db.query('SELECT * FROM info', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('admin/info', { info: results });
        });
    });

    router.post('/info', isAdmin, (req, res) => {
        const { title, type, link, short_description } = req.body;
        db.query('INSERT INTO info (title, type, link, short_description) VALUES (?, ?, ?, ?)', [title, type, link, short_description], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin/info');
        });
    });

    router.put('/info/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        const { title, type, link, short_description } = req.body;
        db.query('UPDATE info SET title = ?, type = ?, link = ?, short_description = ? WHERE id = ?', [title, type, link, short_description, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin/info');
        });
    });

    router.delete('/info/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM info WHERE id = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin/info');
        });
    });

    // CRUD routes for maps
    router.get('/maps', isAdmin, (req, res) => {
        db.query('SELECT * FROM maps', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('admin/maps', { maps: results });
        });
    });

    router.post('/maps', isAdmin, (req, res) => {
        const { geojson, area, photo, description, type } = req.body;
        db.query('INSERT INTO maps (geojson, area, photo, description, type) VALUES (?, ?, ?, ?, ?)', [geojson, area, photo, description, type], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin/maps');
        });
    });

    router.put('/maps/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        const { geojson, area, photo, description, type } = req.body;
        db.query('UPDATE maps SET geojson = ?, area = ?, photo = ?, description = ?, type = ? WHERE id = ?', [geojson, area, photo, description, type, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin/maps');
        });
    });

    router.delete('/maps/:id', isAdmin, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM maps WHERE id = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin/maps');
        });
    });

    return router;
};
