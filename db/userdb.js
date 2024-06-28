const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);
// const uri = "mongodb+srv://fancy98com:E6eoFBqkfDsweSKB@cluster0.rom3xsn.mongodb.net/flyboy";
// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));

const trackInfoSchema = new mongoose.Schema({
    albumart_link:String,
    track_link:String,
    track_title:String,
});


const userInfoSchema = new mongoose.Schema({
  username:String,
  artistname:String,
  fullname:String,
  email:{
    type:String,
    unique:false,
    required: true,
  },
  tracks:[trackInfoSchema],
  password:String,
  phone:String,
  country:String,
  address:String,
  admin:Boolean,
  propic:String,


},
{timestamps: true}

);

userInfoSchema.plugin(passportLocalMongoose , {selectFields: "username password"});


module.exports = userInfoSchema;
