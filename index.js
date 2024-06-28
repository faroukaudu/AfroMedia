const express = require('express');
require('dotenv').config();
// var https = require("https");
var path = require('path');
// var fs = require('fs');
// var fs = require('fs');
// const md5 = require('md5');
// var axios = require("axios");
const ejs = require('ejs');
// const lodash = require('lodash');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
var db = require(__dirname + "/db/connection.js");
var userschema = require(__dirname + "/db/userdb.js");
// var idCountSchema = require(__dirname + "/db/userIdAssigndb.js");
// var payment = require(__dirname + "/db/payment.js");
const passport = require("passport");
const session = require("express-session");
var _ = require('lodash');
const upload = require("./middleware/multer");
const cloudinary = require("./utils/cloudinary");
// const email = require('./emailsend.js');
// const welcomeEmail = email.registrationMail; // Mail After Registration



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
// const passwrdResetToken = require('node-random-chars');


// Sessions start
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        //Expire Session after 1min.
        maxAge: 60000000,
     }
  }));
// Sessions End

// Initialize Seesion start
app.use(passport.initialize());
app.use(passport.session());

// Initialize Seesion end

// const uri = "mongodb+srv://consumerlaw:"+process.env.PASSWORDDB+"@consumerlaw.vfwut3x.mongodb.net/lawDB";


// const uri = "mongodb://127.0.0.1:27017/afroMedia";
const uri = "mongodb+srv://Afrodb:"+process.env.PASSWORDDB+"@afrodb.bvwbyet.mongodb.net/afroMedia";

database().catch(err => console.log(err));


async function database() {
  await mongoose.connect(uri);
  // await mongoose.connect('mongodb://127.0.0.1:27017/emcDB');
}


function appDb(){
    // userschema.plugin(uniqueValidator);
    const Admindb = mongoose.model("User",userschema);
    passport.use(Admindb.createStrategy());
  
    passport.serializeUser(function(user, cb) {
      console.log("serializing user uwuss:" + JSON.stringify(user))
      process.nextTick(function() {
        console.log(user.id);
          return cb(null, user.id)
      })
  });
  
  passport.deserializeUser(function (id, cb) {
    console.log("trying to GET" + id);
      console.log("deserializing user owo:" + JSON.stringify(id))
      Admindb.findById({_id:id}).then((user)=>{
        console.log("GETTING");
        return cb(null, user);
      }).catch((err)=>{
        return cb(err);
      });   
  });
  
     return Admindb;
  }

  const User = appDb();

//WEBSITE PAGES


// const idCountDB = mongoose.model("UserIdCount",idCountSchema);
// const paymentModel = mongoose.model("Payment", payment);

app.get("/",(req,res)=>{
    res.render("front/index");
})

app.get("/about",(req,res)=>{
    res.render("front/about");
})



// app.get("/login", (req,res)=>{
//     res.render("dashboard/login");
// })
// app.get("/register", (req,res)=>{
//     res.render("dashboard/register");
// })
// app.get("/reset", (req,res)=>{
//     res.render("dashboard/forgot-password");
// })

// app.post("/upload", upload.single('image'), function (req,res){


// EXPORTS
module.exports = {
    main:app,
    db:appDb(),
    // payment:paymentModel,
  }