var mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useCreateIndex: true,useFindAndModify: false}).then(()=>{
  console.log('Connected to MongoDB');
}).catch((e)=>{
  console.log(e);
});
