const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all destinations (HTML view)
 router.get('/destinations', (req, res) => { db.query('SELECT * FROM destinations', (err, results) => { if (err) throw err; res.render('destinations', { destinations: results }); }); });

// Get a single destination (HTML view) 
router.get('/destinations/:id', (req, res) => { const { id } = req.params; db.query('SELECT * FROM destinations WHERE id = ?', [id], (err, results) => { if (err) throw err; if (results.length === 0) { return res.status(404).json({ message: 'Destination not found' }); } res.render('destination', { destination: results[0] }); }); });

// Create a new destination
router.post('/destinations', (req, res) => {
    const { name, description, facilities, entry_fee, location } = req.body;
    db.query('INSERT INTO destinations (name, description, facilities, entry_fee, location) VALUES (?, ?, ?, ?, ?)', [name, description, facilities, entry_fee, location], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/destinations');
    });
});

// Get all destinations (HTML view)
router.get('/destinations', (req, res) => {
    db.query('SELECT * FROM destinations', (err, results) => {
        if (err) throw err;
        res.render('destinations', { destinations: results });
    });
});

// Get a single destination (HTML view)
router.get('/destinations/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM destinations WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.render('destination', { destination: results[0] });
    });
});

// Update a destination
router.put('/destinations/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, facilities, entry_fee, location } = req.body;
    db.query('UPDATE destinations SET name = ?, description = ?, facilities = ?, entry_fee = ?, location = ? WHERE id = ?', [name, description, facilities, entry_fee, location, id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/destinations');
    });
});

// Delete a destination
router.delete('/destinations/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM destinations WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/destinations');
    });
});

// Get all accommodations (HTML view)
router.get('/accommodations', (req, res) => {
    db.query('SELECT * FROM accommodations', (err, results) => {
        if (err) throw err;
        res.render('accommodations', { accommodations: results });
    });
});

// Create a new accommodation
router.post('/accommodations', (req, res) => {
    const { name, description, contact, price } = req.body;
    db.query('INSERT INTO accommodations (name, description, contact, price) VALUES (?, ?, ?, ?)', [name, description, contact, price], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/accommodations');
    });
});

// Update an accommodation
router.put('/accommodations/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, contact, price } = req.body;
    db.query('UPDATE accommodations SET name = ?, description = ?, contact = ?, price = ? WHERE id = ?', [name, description, contact, price, id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/accommodations');
    });
});

// Delete an accommodation
router.delete('/accommodations/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM accommodations WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/accommodations');
    });
});

// Get all events (HTML view)
router.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) throw err;
        res.render('events', { events: results });
    });
});

// Create a new event
router.post('/events', (req, res) => {
    const { title, description, event_date, location } = req.body;
    db.query('INSERT INTO events (title, description, event_date, location) VALUES (?, ?, ?, ?)', [title, description, event_date, location], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/events');
    });
});

// Update an event
router.put('/events/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, event_date, location } = req.body;
    db.query('UPDATE events SET title = ?, description = ?, event_date = ?, location = ? WHERE id = ?', [title, description, event_date, location, id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/events');
    });
});

// Delete an event
router.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM events WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/events');
    });
});

// Create a new visitor
router.post('/visitors', (req, res) => {
    const { name, contact, feedback, visit_date } = req.body;
    db.query('INSERT INTO visitors (name, contact, feedback, visit_date) VALUES (?, ?, ?, ?)', [name, contact, feedback, visit_date], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/visitors');
    });
});

// Get all visitors (HTML view)
router.get('/visitors', (req, res) => {
    db.query('SELECT * FROM visitors', (err, results) => {
        if (err) throw err;
        res.render('visitors', { visitors: results });
    });
});

// Get a single visitor for editing (HTML view)
router.get('/visitors/edit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM visitors WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.render('edit_visitor', { visitor: results[0] });
    });
});

// Update a visitor
router.post('/visitors/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, contact, feedback, visit_date } = req.body;
    db.query('UPDATE visitors SET name = ?, contact = ?, feedback = ?, visit_date = ? WHERE id = ?', [name, contact, feedback, visit_date, id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/visitors');
    });
});

// Delete a visitor
router.post('/visitors/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM visitors WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.redirect('/tourism/visitors');
    });
});


module.exports = router;
