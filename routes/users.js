var express=require('express');
var router=express.Router();

//Login page
router.get('/login',(req,res)=>{
  res.render('login');
});

//Register page
router.get('/register',(req,res)=>{
  res.render('register');
});

module.exports=router;
