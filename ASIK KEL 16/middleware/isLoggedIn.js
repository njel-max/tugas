// middleware/isLoggedIn.js
module.exports = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login'); // Redirect jika tidak ada session
    }
    next();
};
