var express=require('express');
var router=express.Router();
var {ensureUnAuthenticated}=require('../middleware/auth');


router.get('/',ensureUnAuthenticated,(req,res)=>{
  res.render('index');
});

module.exports=router;
