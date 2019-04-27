var mongoose=require('mongoose');


var TodoSchema=new mongoose.Schema({
  todo:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{           //unix timestamp
    type:Number ,
    default:null
  },
  _creator:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
});

var Todo=mongoose.model('Todo',TodoSchema);

module.exports={Todo};
