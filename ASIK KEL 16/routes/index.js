// routes/index.js
const express = require('express');
const router = express.Router();

module.exports = () => {
    // Landing Page
    router.get('/', (req, res) => {
        res.render('landing');
    });

    // Dashboard
    router.get('/dashboard', (req, res) => {
        if (req.session.user) {
            res.render('dashboard', { user: req.session.user });
        } else {
            res.redirect('/auth/login');
        }
    });

    // About Page
    router.get('/about', (req, res) => {
        res.render('about');
    });

    // Contact Page
    router.get('/contact', (req, res) => {
        res.render('contact');
    });

    
    // Reports Page
    router.get('/reports', (req, res) => {
        res.render('reports');
    });

    // Login Page
    router.get('/login', (req, res) => {
        res.render('login');
    });

    // Register Page
    router.get('/register', (req, res) => {
        res.render('register');
    });

    // Profile Page
    router.get('/profile', (req, res) => {
        res.render('profile');
    });

    // Map Page
    router.get('/map', (req, res) => {
        res.render('map');
    });

    // Info Page
    router.get('/info', (req, res) => {
        res.render('info');
    });

    // Info Admin Page
    router.get('/infoadmin', (req, res) => {
        res.render('infoadmin');
    });

    // Info Page
    router.get('/mapadmin', (req, res) => {
        res.render('mapadmin');
    });

    return router;
};

