const express = require('express');
const path = require('path');

const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static('assets'));


// app.use(function (req, res, next) {
//     console.log('middleware 1 called');
//     next();
// });

// app.use(function(req,res,next){
//     console.log("middleware 2 called");
//     next();
    
// })


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
});

app.post('/contact', function (req, res) {
    // contactList.push(req.body);

    Contact.create(req.body)
        .then(newContact => {
            console.log('New contact created:', newContact);
            res.redirect('/');
        })
        .catch(err => {
            console.log('Error in creating contact:', err);
            res.status(500).send('Error in creating contact');
        });
});

//for deleting a contact
app.get('/delete-contact/',function(req,res){
    //get the query from the url

    //console.log(req.query);
    let phone=req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1)
        contactList.splice(contactIndex,1);

    res.redirect('/');
});




app.listen(port, function(err){
    if(err) console.log('Error in running the server');

    console.log('My express server is running on port:',port);
})
