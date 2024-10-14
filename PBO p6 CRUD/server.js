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
    database: 'crudtugas'
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
    const query = 'SELECT * FROM tugassik';
      connection.query(query, (err, results) => {
        res.render(__dirname + "/view/index.ejs", {tugassik: results});
    });
});
//untuk menampilkan data di dalam js (read)

app.post('/add', (req, res) => {
    const {nama_tugas, jenis_tugas, nama_matkul, deadline, tempat_kumpul} = req.body;
    const query = 'INSERT INTO tugassik (nama_tugas, jenis_tugas, nama_matkul, deadline, tempat_kumpul) VALUES (?,?,?,?,?)';
    connection.query(query, [nama_tugas, jenis_tugas, nama_matkul, deadline, tempat_kumpul], (err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

// create, input, insert data

app.get('/edit/:no', (req,res) => {
    const query = 'SELECT * FROM tugassik WHERE no = ?';
      connection.query(query, [req.params.no], (err, result) => {
        if(err) throw err;
        res.render(__dirname + "/view/edit.ejs", {user: result[0]});
    });
});

//update

app.post('/update/:no', (req,res) => {
    const {nama_tugas, jenis_tugas, nama_matkul, deadline, tempat_kumpul} = req.body;
    const query = 'UPDATE tugassik SET nama_tugas = ?, jenis_tugas = ?, nama_matkul = ?, deadline = ?, tempat_kumpul = ? WHERE no = ?';
      connection.query(query, [nama_tugas, jenis_tugas, nama_matkul, deadline, tempat_kumpul, req.params.no], (err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


//post hasil edit
app.get('/delete/:no', (req,res) => {
    const query = 'DELETE FROM tugassik WHERE no = ?';
      connection.query(query, [req.params.no], (err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//untuk hapus


app.listen(3005,() => {
    console.log("Server berjalan di port 3005, buka web melalui http://localhost:3005")
});

//mastiin bahwa berhasil servernya