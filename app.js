const myModule = require('./index.js');
const user = require('./user.js');
const media = require('./media.js');
// const appadmin = require('./admin.js');

const app = myModule.main;



app.listen(process.env.PORT || 6001, function(req,res){
  console.log("server is now starting @ 6001!");
});

// app.use(function(req, res, next){
//   res.status(404).render("userdash/html/error");
// })
