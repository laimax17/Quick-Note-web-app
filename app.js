//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const lodashCore = require("lodash/core");
const fp = require("lodash/fp");

const homeStartingContent = "This project is a simple personal blog website.";



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postSummary = [];

app.get("/", function(req,res){
  res.render("home", {homePrint: homeStartingContent,
  postArray: postSummary
});
})

app.get("/posts/:postName", function(req,res){
  let reqPostName = req.params.postName;
  postSummary.forEach(post => {
    if ( lodash.lowerCase(reqPostName) === lodash.lowerCase(post.title)) {
      res.render("post", {post: post});
    }
  })
  
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
  const postTitile = req.body.titleText;
  const postBody = req.body.postText;
  let today = new Date();
  let moment = today.toLocaleString();
  const post = {
    title: postTitile,
    content: postBody,
    currentTime: moment
  };
  postSummary.push(post);
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
