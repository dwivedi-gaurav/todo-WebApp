var i=1;
console.log('Entering app.js........',i++);

var express=require('express');
var ejs=require('ejs');
var expressLayout=require('express-ejs-layouts');
var flash=require('connect-flash');
var session=require('express-session');

var app=express();

//MongoDB
require('./db/mongoose');

//Express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Connect-flash
app.use(flash());

//Global Vars
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  next();
});

//EJS
app.set('view engine','ejs');
app.use(expressLayout);

//For static files
app.use(express.static(__dirname+'/public'));

//Bodyparser
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/todos',require('./routes/todos'));

const port=process.env.PORT||3000;

app.listen(port,()=>{
  console.log(`Listening to port ${port}`);
});
