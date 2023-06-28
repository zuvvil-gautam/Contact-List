const express = require('express');

const port = 8000;
const app = express();

app.get('/', function(req,res){
    res.send('<h1>Yo, response from my first express server!!</h1>');
});


app.listen(port, function(err){
    if(err) console.log('Error in running the server');

    console.log('My express server is running on port:',port);
})