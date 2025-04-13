const express = require("express")
const router = express.Router({mergeParams:true}); 
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");

const User = require("../Models/user"); 
const{saveRedirectUrl} = require("../middlewares")



router.get("/signup",(req,res)=>{
    return res.render("users/signup");
});

router.post("/signup",wrapAsync (async(req,res) =>{
    try{
    let{username,email,password} = req.body;
    const newUser =   new User({email,username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        } 
        req.flash("success","Welcome to EliteStay");
        res.redirect("/listings");
    });
   
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
}))

router.get("/login",(req,res)=>{
    return res.render("users/login");
});



router.post(
    '/login',
    saveRedirectUrl,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
    }),
    (req, res) => {
      req.flash('success', 'Welcome to EliteStay');
    let redirectUrl = res.locals.redirectUrl || "/listings"
      res.redirect(redirectUrl);
    }
  );
  
    router.get("/logout",(req,res,next)=>{
        req.logout((err)=>{
            if(err){
                next(err);
            }
            req.flash("success","You are logout now");
            res.redirect("/listings");
        });
    });

module.exports = router;