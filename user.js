const myModule = require('./index.js');
// const appadmin = require('./admin.js');
var _ = require('lodash');
const passport = require("passport");
const session = require("express-session");

const app = myModule.main;
const User = myModule.db;




app.get("/login", (req,res)=>{
    res.render("dashboard/login");
})
app.get("/register", (req,res)=>{
    res.render("dashboard/register");
})
app.get("/reset", (req,res)=>{
    res.render("dashboard/forgot-password");
})


// SIGNIN USER
app.post("/sign-in", (req,res)=>{
    req.body.username = _.capitalize(req.body.username);
      console.log(req.body.username +" is the mail");
      console.log(_.capitalize(req.body.username));
      var userLogin = new User({username:req.body.username, password:req.body.password});
      req.login(userLogin, function(err){
        if(!err){
          passport.authenticate("local", {
            
            // successRedirect: "/dashboard",
            failureRedirect:"/error911",
            failureMessage: true
          })(req,res, function(){
            // console.log(req.user);
          //   Redirecting to user Dashboard
            res.redirect("/dashboard");
            // res.render("userdash/animations/enter");
            // res.send("Logged IN");
            })
        }else{
        //   res.render("userdash/animations/usererr", {errorMsg:"Invalid Login Details !!!"});
        res.send(err);
          // res.send("error login")
        }
      })
    });

        // SIGNUP USER

    app.post("/register", function(req, res){
        req.body.username = _.capitalize(req.body.username);
        //   var banking = {
        //       bankName:req.body.bankName,
        //       accountName:req.body.acc_name,
        //       accountNum:req.body.acc_num,
        //       };
        console.log(req.body.fullname);
        console.log(req.body.username);
        console.log(req.body.country);
        console.log(req.body.artname);
        console.log(req.body.phone);
        console.log(req.body.address);
        console.log(req.body.password);
      
          User.register(new User({
            username:req.body.username,
            artistname:_.capitalize(req.body.artname),
            fullname: req.body.fullname,
            email:req.body.username,
            country:req.body.country,
            // regDate:"today",
            phone:req.body.phone,
            address:req.body.address,


          }), req.body.password, 
          function(err, user){
            if(!err){
              passport.authenticate("local", {
                failureRedirect: '/error991',
                failureMessage: true
              })(req, res, function () {
               
                // setTimeout(function() {
                  res.redirect("/dashboard");
                //   res.render("userdash/animations/regani");
                //   welcomeEmail({username:req.body.firstname, email:req.body.username});
                // }, 2000);
              });
            }else{
                res.send(err);
                // res.send("USer could not signin, STOPPED!!!");
            //   res.render("userdash/animations/usererr", {errorMsg:"Registration Error!!!"});
            }
          
          })
          
          })

        //   LOGOUT
  
    app.get("/logout", (req,res)=>{
      req.logout(function(err){
        if(err){
          console.log(err);
        }else{
          res.redirect("/login");
        }
      })
    });


    app.get("/dashboard",(req,res)=>{
        if(req.isAuthenticated()){
            console.log(req.user);
            res.render("dashboard/dashboard",{userInfo:req.user});
        }else{
            res.redirect("/login");
        }
        // res.render("dashboard/dashboard");

        
    })


    app.get("/profile",(req,res)=>{
      if(req.isAuthenticated()){
        res.render("dashboard/profile-edit", {userInfo:req.user});
      }else{
        res.redirect("/logout");
      }
     });