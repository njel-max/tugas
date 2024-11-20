const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Menggunakan db.js
const bcrypt = require('bcryptjs');
const MySQLStore = require('express-mysql-session')(session); 
const authRoutes = require('./routes/auth')(db); 
const infoRoutes = require('./routes/info')(db); 
const mapRoutes = require('./routes/map')(db);
const reportRoutes = require('./routes/report')(db); 
const adminRoutes = require('./routes/admin')(db);
const indexRoutes = require('./routes/index')();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// Set view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index')(db));
app.use('/auth', require('./routes/auth')(db));

app.use('/', indexRoutes); 
app.use('/auth', authRoutes); 
app.use('/info', infoRoutes); 
app.use('/map', mapRoutes); 
app.use('/report', reportRoutes); 
app.use('/admin', adminRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
