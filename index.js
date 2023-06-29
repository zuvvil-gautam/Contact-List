const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


var contactList = [
    {
        name:'Luffy',
        phone:'123'
    },
    {
        name:'Zuvvil',
        phone:'234'
    },
    {
        name:'Gautam',
        phone:'345'
    },
    {
        name:'Zoro',
        phone:'456'
    },
    {
        name:'Chopper',
        phone:'567'
    },
    {
        name:'Nami',
        phone:'678'
    },
    {
        name:'Sanji',
        phone:'789'
    }
]


app.get('/', function(req,res){

    return res.render('home', {
        title: "Contact List",
        contact_list:contactList
    });
});

app.get('/play', function(req,res){

    return res.render('practise', {title:"Playground"})
})


app.listen(port, function(err){
    if(err) console.log('Error in running the server');

    console.log('My express server is running on port:',port);
})
