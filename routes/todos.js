var express=require('express');
var router=express.Router();
var {Todo}=require('../models/Todo');
var {ensureAuthenticated}=require('../middleware/auth');

//Todos home page
router.get('/home',ensureAuthenticated,(req,res)=>{
  res.render('home');
});

//Add todo
router.post('/add',ensureAuthenticated,(req,res)=>{
  var {todo}=req.body;
  var errors=[];
  if(todo==''){
    errors.push({msg:'Enter a Todo.'});
    res.render('home',{errors,todo});
  }else{
    var todo =new Todo({todo,_creator:req.user.id});
    todo.save({todo}).then((todo)=>{
      req.flash('success_msg','Todo Added.');
      res.redirect('/todos/home');
    }).catch((e)=>{
      req.flash('error_msg','Database error.');
      console.log(e);
      res.redirect('/todos/home');
    })
  }
});


module.exports=router;
