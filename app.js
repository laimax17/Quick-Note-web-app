//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const lodashCore = require("lodash/core");
const fp = require("lodash/fp");
const mongoose = require("mongoose");

const homeStartingContent = "This project is a simple personal blog website.";



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




mongoose.connect("mongodb+srv://mazzy17:mazzy17@cluster0.pkkd1.mongodb.net/blogDB");


const Schema = mongoose.Schema;

const postSchema = new Schema ({
  title: String,
  content: String,
  date: String
});

const Post = mongoose.model('Post', postSchema);

app.get("/", function(req,res){

  Post.find({},function(err,posts){
    if (!err){
      res.render("home", {
        homePrint: homeStartingContent,
        postArray: posts
        });
    }
  });

  
})

app.get("/posts/:postID", function(req,res){
  let reqPostID = req.params.postID;
  
  Post.findOne({_id:reqPostID},function(err,foundPost){
    if (!err) {
      res.render("post",{post: foundPost});
    }else{
      console.log(err);
    }
  });
  
  // if ( lodash.lowerCase(reqPostName) === lodash.lowerCase(post.title)){
    
  //   })
  // }
  
})

app.get("/about",function(req,res){
  res.render("about");
})

app.get("/contact",function(req,res){
  res.render("contact");
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){

  let newTitle =  req.body.titleText;
  let newContent = req.body.postText;
  let today = new Date();
  let moment = today.toLocaleString();

  let newPost = new Post({
    title : newTitle,
    content : newContent,
    date : moment
  });

  newPost.save();

  res.redirect("/");

})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
