var express=require('express');
var router=express.Router();
var {Todo}=require('../models/Todo');
var {ensureAuthenticated}=require('../middleware/auth');
var {ObjectID}=require('mongodb');

//Todos home page
router.get('/home',ensureAuthenticated,(req,res)=>{
  var p1=Todo.find({completed:false});
  var p2=Todo.find({completed:true});

  Promise.all([p1,p2]).then((todos)=>{
    res.render('home',{todos,ObjectID});
  }).catch((e)=>{
    req.flash('error_msg','Could not load todos, because of some database error.');
    res.redirect('/todos/home');
  });
});

//Add todo
router.post('/add',ensureAuthenticated,(req,res)=>{
  var {todo}=req.body;
  var errors=[];
  if(todo==''){
    errors.push({msg:'Enter a Todo.'});
    res.render('home',{errors});
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

router.post('/update',(req,res)=>{
  var {id,todo,done}=req.body;
  body={todo};
  if(done){
    body.completed=true;
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user.id
  },body,{new:true}).then((todo)=>{
    req.flash('success_msg','Todo updated successfully.');
    res.redirect('/todos/home');
  }).catch((e)=>{
    req.flash('error_msg','Database error.');
    res.redirect('/todos/home');
  });
});

router.get('/delete/:id',(req,res)=>{
  Todo.findOneAndDelete({
    _id:req.params.id,
    _creator:req.user.id
  }).then((todo)=>{
    if(!todo){
      req.flash('error_msg','Reuested todo not found.');
      res.redirect('/todos/home');
    }else{
      req.flash('success_msg','Todo deleted successfully.');
      res.redirect('/todos/home');
    }
  }).catch((e)=>{
    req.flash('error_msg','Database error');
    res.redirect('/todos/home');
  });
});

module.exports=router;
