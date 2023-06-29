const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(function (req, res, next) {
    console.log('middleware 1 called');
    next();
});

app.use(function(req,res,next){
    console.log("middleware 2 called");
    next();
    
})


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
    
]


app.get('/', function(req,res){

    return res.render('home', {
        title: "Contact List",
        contact_list:contactList
    });
});
 
app.get('/practise', function(req,res){

    return res.render('practise', {title:"Playground"})
})

app.post('/contact', function(req,res){
    console.log(req.body);
    // contactList.push(req.body);
    // res.redirect('/');
})


app.listen(port, function(err){
    if(err) console.log('Error in running the server');

    console.log('My express server is running on port:',port);
})
