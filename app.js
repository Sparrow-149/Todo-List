// require modules
const express = require("express");
const bodyParser = require("body-parser");
// this is for date.js the modulue which we created
const date = require(__dirname + "/date.js");

// creating an express app
const app = express();

// creating an array to store the tasks
const newtasks = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

// setting up ejs as view engine
app.set('view engine', 'ejs');
// using body parser
app.use(bodyParser.urlencoded({extended:true}));
// using static files
app.use(express.static("public"));

// get request
app.get("/",function(req,res){
    // let day  = date(); // this is for date.js the modulue which we created
    // this is useful when we have only one fucntion which is directly bounded to module.exports
    // but if we have multiple functions we can use exports
    const day = date.getDate();
    
    res.render("list",{listTitle:day, newlistitems:newtasks});
});
// get request for work route
app.get("/work",function(req,res){
    // this res.render is used to render the ejs file for the work route
    res.render("list", {listTitle: "Work", newlistitems : workItems} );
});
// get request for about route
app.get("/about",function(req,res){
    res.render("about");
});

// post request
app.post("/",function (req,res) {  
    // fetching the new item from the form
    const newtask  = req.body.newitem;
    // checking the list name if it is for work route or home route
    if(req.body.list == "Work"){
        workItems.push(newtask);
        res.redirect("/work");
    }else{
        newtasks.push(newtask);
        res.redirect("/");
    }
});


app.listen(3000,function(req,res){
    console.log("server Listening to port 3000");
}); 