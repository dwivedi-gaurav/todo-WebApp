var express=require('express');
var router=express.Router();
var {ensureAuthenticated}=require('../middleware/auth');

//Todos home page
router.get('/home',ensureAuthenticated,(req,res)=>{
  res.render('home');
});


module.exports=router;
