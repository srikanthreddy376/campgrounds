var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/",function(req,res){
  res.render("landing");
  });

  
//AUTH ROUTES 

router.get("/register",function(req,res){
  res.render("register");
 });
 
 //HANDLE SIGNUP ROUTE
 router.post("/register",function(req,res){
 var newUser = new User({username : req.body.username});
 User.register(newUser,req.body.password,function(err,user){
   if(err){
     console.log(err);
     return res.render("register");
   }
   passport.authenticate("local")(req,res,function(){
     res.redirect("/campgrounds");
   });
 });
 });
 
 //show LoginForm
 
 router.get("/login",function(req,res){
   res.render("login");
 });
 //Submit Route for login
 
 router.post('/login', passport.authenticate('local',
         {   successRedirect:"/campgrounds",
             failureRedirect: '/login',
 
         }),function(req, res) {
 
             res.redirect('/');
   });
 
   //log out
   router.get("/logout",function(req,res){
      req.logout();
      res.redirect("/");
 
   });
 
 function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     }
     res.redirect("/login");
   }

   module.exports = router;