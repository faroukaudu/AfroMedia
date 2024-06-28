const myModule = require('./index.js');
// const appadmin = require('./admin.js');
var _ = require('lodash');
const passport = require("passport");
const session = require("express-session");
const upload = require("./middleware/multer");
const cloudinary = require("./utils/cloudinary");

const app = myModule.main;
const User = myModule.db;

app.get("/submit-song", (req,res)=>{
    if(req.isAuthenticated()){
        res.render("dashboard/add-track", {userInfo:req.user});
    }else{
        res.redirect("/login");
    }
})

app.post("/submit-song", (req,res)=>{
    
});

// uploading tracks info



// app.post("/upload", upload.single('image'), function (req,res){
const cpUpload = upload.fields([{name:'albumart', maxCount:1},{name:'track',maxCount:1}]);

    app.post("/upload", cpUpload, async function (req,res){
        // inputs from form
        const trackTitle = req.body.tracktitle;
        const artistId = req.body.id;
        // console.log("My UserId is> "+artistId);
        // const features = req.body.feat;
        // const soundEngineer = req.body.sound;
        // const year = req.body.year;

        const uploadsPaths = [];
        await uploadsPaths.push(req.files.albumart[0].path);
        await uploadsPaths.push(req.files.track[0].path);
        const resultList = [];

        console.log(uploadsPaths);

        // console.log(req.files.albumart[0].path);
        // res.send(req.files).json()
        // const paths = req.files;
        // const img = [
        //     'C:\\Users\\FAROUK\\AppData\\Local\\Temp\\bro.jpg',
        //     'C:\\Users\\FAROUK\\AppData\\Local\\Temp\\bro.jpg'
        // ]

        const trackInfo = {
                albumart_link:"",
                track_link:"",
                track_title:"",
            };

            var myindex = 0;
            uploadsPaths.forEach( function(path) {
                
            
                cloudinary.uploader.upload(path ,  { resource_type: "auto" }).then((result)=>{
                
                // console.log("Pushing "+index +" !!!!!!!!!");
                // resultList.push(result);
                // console.log(result);
                User.findById(artistId).then((artistFound)=>{
                    if(myindex == 0){
                        console.log(myindex);
                        console.log(result.secure_url);
                        trackInfo.albumart_link = result.secure_url;
                        trackInfo.track_title = trackTitle;
                        myindex = myindex +1;
                    }else if(myindex == 1){
                        console.log(myindex);
                        console.log(result.secure_url);
                        trackInfo.track_link = result.secure_url;
                        artistFound.tracks.push(trackInfo);
                        artistFound.save();
                        // console.log("Database Updated");
                        // res.render("dashboard/music-view", {ima});
                        res.render("dashboard/music-view", {newUpload:trackInfo, userInfo:req.user});
                        // myindex = 0;
                    }
                    

                
                // ERROR FOR FETCHING USER DATABASE
                }).catch((err)=>{
                    console.log("Error from Databse "+ err);
                })
                        
                        
                // CATCH FOR CLOUDINARY UPLOADS
                }).catch((err)=>{
                    console.log("Error from CLoudinary "+err);
                })
                // console.log(resultList);


        
                
                
            
            });
        
        
    })
  
  app.get("/music-view", (req,res)=>{
    res.render("dashboard/music-view");
  })

  app.get("/upload",(req,res)=>{
    res.redirect("/dashboard");
  })


//   Upload Profile Picture
app.post("/profile", upload.single('pro-pic'), async function (req,res){
    console.log("I am in uploading");
    await User.findById(req.body.id).then((userFound)=>{
        cloudinary.uploader.upload(req.file.path).then((result)=>{
            userFound.propic = result.secure_url;
            userFound.save();
            res.redirect("/profile");



        }).catch((err)=>{
            res.send(err);
        })

    }).catch((err)=>{
        res.send("User Fetch Error "+ err);
    })
    
})