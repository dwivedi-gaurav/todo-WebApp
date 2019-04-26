module.exports={
  ensureAuthenticated:(req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }else{
      req.flash('error_msg','Please login to view this page.');
      res.redirect('/users/login');
    }
  },
  ensureUnAuthenticated:(req,res,next)=>{
    if(!req.isAuthenticated()){
      return next();
    }else{
      req.flash('error_msg','You are already logged in.');
      res.redirect('/users/login');
    }
  }
}
