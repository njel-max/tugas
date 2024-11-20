// routes/map.js
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = (db) => {
    // Retrieve all locations
    router.get('/', isLoggedIn, (req, res) => {
        db.query('SELECT id, geojson, area, description, type FROM maps WHERE user_id = ?', [req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('map', { locations: results });
        });
    });

    // Create new location
    router.post('/', isLoggedIn, (req, res) => {
        const { geojson, area, description, type } = req.body;
        db.query('INSERT INTO maps (user_id, geojson, area, description, type) VALUES (?, ?, ?, ?, ?)', [req.session.user.id, geojson, area, description, type], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/map');
        });
    });

    // Edit location
    router.get('/edit/:id', isLoggedIn, (req, res) => {
        const { id } = req.params;
        db.query('SELECT id, geojson, area, description, type FROM maps WHERE id = ? AND user_id = ?', [id, req.session.user.id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                res.render('edit-map', { location: results[0] });
            } else {
                res.status(404).send('Map data not found');
            }
        });
    });

    // Update location
    router.post('/edit/:id', isLoggedIn, (req, res) => {
        const { id } = req.params;
        const { geojson, area, description, type } = req.body;
        db.query('UPDATE maps SET geojson = ?, area = ?, description = ?, type = ? WHERE id = ? AND user_id = ?', [geojson, area, description, type, id, req.session.user.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/map');
        });
    });

    // Delete location
    router.post('/delete/:id', isLoggedIn, (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM maps WHERE id = ? AND user_id = ?', [id, req.session.user.id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/map');
        });
    });

    return router;
};
