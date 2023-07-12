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

    Contact.find(req.body)
        .then(contacts => {
            console.log("Contacts fetched successfully");
            res.render('home',{
                title:'Contact list',
                contact_list : contacts
            }); 
        })
        .catch(err => {
            console.log('error in fetching contact from database');
            return ;
        })
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
    //get the id from  query in the url
     let id = req.query.id;

     //find the contact in the database using id and delete

     Contact.findByIdAndDelete(id)
     .then(id =>{
        res.redirect('/');

    })
     .catch(err =>{
        console.log('error in deleting an object from database');
        return ;
        
     });
});




app.listen(port, function(err){
    if(err) console.log('Error in running the server');

    console.log('My express server is running on port:',port);
})
