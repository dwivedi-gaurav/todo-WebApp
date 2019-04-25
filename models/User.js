var mongoose=require('mongoose');
var validator=require('validator');

var UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a vaild email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  }
});

var User=mongoose.model('User',UserSchema);

module.exports={User};
