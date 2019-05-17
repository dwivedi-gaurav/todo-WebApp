var localStrategy=require('passport-local').Strategy;
var GoogleStrategy=require('passport-google-oauth20').Strategy;
var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var {User}=require('../models/User');
var keys=require('../config/keys');

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

  passport.use(
      new GoogleStrategy({
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'/users/login/google/redirect'
      },(accessToken,refreshToken,profile,done)=>{
        User.findOne({googleId:profile.id}).then((user)=>{
          if(user){
            done(null,user);
          }else{
            var user=new User({
              googleId:profile.id,
              name:profile.displayName,
              email:profile.emails[0].value
            });
            return user.save();
          }
        }).then((user)=>{
          done(null,user);
        }).catch((e)=>{
          req.flash('error_msg','Could not login, because of some database error. Please try again.');
          res.redirect('/users/login');
        })
      })
  )

  passport.serializeUser((user,done)=>{
    done(null,user.id)
  });
  passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
      done(err,user);
    });
  });
}
