var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoWebApp',{useNewUrlParser: true,useCreateIndex: true}).then(()=>{
  console.log('Connected to MongoDB');
}).catch((e)=>{
  console.log(e);
});
