const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();


let newtasks = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    let day = date.getDate();
    // let day  = date();
    res.render("list",{listTitle:day, newlistitems:newtasks});
});


app.get("/work",function(req,res){
    res.render("list", {listTitle: "Work", newlistitems : workItems} );
});

app.post("/",function (req,res) {  
 
    let newtask  = req.body.newitem;
    if(req.body.list == "Work")
    {
        workItems.push(newtask);
        res.redirect("/work");
    }
    else
    {
        newtasks.push(newtask);
        res.redirect("/");
    }
});

app.get("/about",function(req,res){
    res.render("about");
});

app.listen(3000,function(req,res){
    console.log("server Listening to port 3000");
}); 