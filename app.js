var express=require('express');
var ejs=require('ejs');
var expressLayout=require('express-ejs-layouts');

var app=express();

//EJS
app.set('view engine','ejs');
app.use(expressLayout);

app.use(express.static(__dirname+'/public'));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/todos',require('./routes/todos'));

const port=process.env.PORT||3000;

app.listen(port,()=>{
  console.log(`Listening to port ${port}`);
})
