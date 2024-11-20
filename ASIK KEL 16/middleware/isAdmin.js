// middleware/isAdmin.js
module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send('Unauthorized');
    }
};
