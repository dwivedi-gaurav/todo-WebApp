var express=require('express');
var router=express.Router();
var {User}=require('../models/User');
var validator = require("email-validator");
var bcrypt=require('bcryptjs');
var passport=require('passport');
var {ensureUnAuthenticated,ensureAuthenticated}=require('../middleware/auth');

//Login page
router.get('/login',ensureUnAuthenticated,(req,res)=>{
  res.render('login');
});

//Register page
router.get('/register',ensureUnAuthenticated,(req,res)=>{
  res.render('register');
});

//Register handle
router.post('/register',ensureUnAuthenticated,(req,res)=>{
  var {name,email,password,password2}=req.body;
  var errors=[];
  if(!name || !email || !password || !password2){
    errors.push({msg:'All fields are required.'});
  }
  if(password!=password2){
    errors.push({msg:'Passwords do not match.'});
  }
  if(password.length<6){
    errors.push({msg:'Password length must be atleast 6 characters long.'});
  }
  if(!validator.validate(email)){
    errors.push({msg:'Invalid Email Address.'});
  }
  if(errors.length>0){
    res.render('register',{errors,name,email,password,password2});
  }else{
    User.findOne({email}).then((user)=>{
      if(user){
        errors.push({msg:'Email already registered.'});
        res.render('register',{errors,name,email,password,password2})
      }else{
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(password,salt,(err,hash)=>{
              if(err) throw err;
              var user= new User({name,email,password:hash});
              user.save().then((user)=>{
                req.flash('success_msg','You are now registered and can login.');
                res.redirect('/users/login');
              }).catch((e)=>{
                errors.push({msg:'Database error! Please try again.'});
                console.log(e.message);
                res.redirect('/users/register');
              });
          });
        });
      }
    });
  }
});

//Login handle
router.post('/login',ensureUnAuthenticated,(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/todos/home',
    failureRedirect:'/users/login',
    failureFlash:true
  })(req,res,next);
});

//Logout handle
router.get('/logout',ensureAuthenticated,(req,res)=>{
  req.logout();
  req.flash('success_msg','You are logged out.');
  res.redirect('/users/login');
});

module.exports=router;
