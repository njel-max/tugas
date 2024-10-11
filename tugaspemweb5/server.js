const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    fs.readfile('index.html', function(err, data){
        res.statusCode = 200; 
        res.setHeader =('Content-Type', 'text/html');
        res.write(data);
        return res.end(); 
    });
});

server.listen(3000, () => { 
    console.log("Server Berhasil Berjalan di port 3000");
});

