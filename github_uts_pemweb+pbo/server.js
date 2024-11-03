const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');
const indexRoutes = require('./routes/index');
const tourismRoutes = require('./routes/tourism');

dotenv.config();

const app = express();

// Use tourism routes
app.use('/tourism', tourismRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.use('/', indexRoutes);
app.use('/tourism', tourismRoutes);

const PORT = process.env.PORT || 3010;
app.listen(3010, () => {
    console.log(`Server is running on port 3050`);
});
