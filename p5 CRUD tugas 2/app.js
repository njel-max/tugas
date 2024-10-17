const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static('public'));

const connection = mysql.createConnection({
    host:  'localhost',
    user: 'root',
    password: '',
    database: 'crudnodemysql'
});

connection.connect((err) => {
    if(err) {
        console.error("terjadi kesalahan dalam koneksi ke MySQL:", err.stack);
        return;
    }
    console.log("koneksi MySQL berhasil dengan id" + connection.threadId)
});

app.set('view engine', 'ejs');

//ini adalah routing (crud)

app.get('/', (req,res) => {
    const query = 'SELECT * FROM users';
      connection.query(query, (err, results) => {
        res.render('index', {users: results});
    });
});
//untuk menampilkan data di dalam js (read)

app.post('/add', (req, res) => {
    const {name, email, phone} = req.body;
    const query = 'INSERT INTO users (name, email, phone) VALUES (?,?,?)';
    connection.query(query, [name, email, phone], (err, result) => {
        if(err) throw err;
        res.redirect('/?message=User+berhasil+ditambahkan');
    });
});

// create, input, insert data

app.get('/edit/:id', (req,res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
      connection.query(query, [req.params.id], (err, result) => {
        if(err) throw err;
        res.render('edit', {user: result[0]});
    });
});

//update

app.post('/update/:id', (req,res) => {
    const {name, email, phone} = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
      connection.query(query, [name, email, phone, req.params.id], (err, result) => {
        if(err) throw err;
        res.redirect('/?message=User+berhasil+diupdate');
    });
});


//post hasil edit
app.get('/delete/:id', (req,res) => {
    const query = 'DELETE FROM users WHERE id = ?';
      connection.query(query, [req.params.id], (err, result) => {
        if(err) throw err;
        res.redirect('/?message=User+berhasil+dihapus');
    });
});

//untuk hapus


app.listen(3030,() => {
    console.log("Server berjalan di port 3030, buka web melalui http://localhost:3030")
});

//mastiin bahwa berhasil servernya