const http = require('http');

const server = http.createServer((req, res) => {
    res.end("this is a hello wolrd....");
});

server.listen(process.env.PORT || 3000);





//const express = require('express');
//const port = 3001;



//let app = express();

//app.get('/', (req, res) => {

//  res.send('hello world...')

//});

//app.listen(port, () => {
//  console.log(`Example app listening at http://localhost:${port}`);
//})