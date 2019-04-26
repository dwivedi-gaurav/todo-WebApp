var localStrategy=require('passport-local').Strategy;
var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var {User}=require('../models/User');

module.exports=(passport)=>{
  passport.use(
    new localStrategy({usernameField:'email'},(email,password,done)=>{
      User.findOne({email}).then((user)=>{
        if(!user){
          return done(null,false,{message:'Email is not registered.'});
        }
        bcrypt.compare(password,user.password,(err,res)=>{
          if(res){
            return done(null,user);
          }else{
            return done(null,false,{message:'Password incorrect.'});
          }
        })
      }).catch((e)=>{
        errors.push({msg:'Database error! Please try again.'});
        console.log(e.message);
        res.redirect('/users/register');
      })
    })
  );
  passport.serializeUser((user,done)=>{
    done(null,user.id)
  });
  passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
      done(err,user);
    });
  });
}
