const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const date = require(__dirname + "/date.js");


const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/todolistDB"); //connection String
const itemsSchema = {
    name : String
};
const Item  = mongoose.model("Item",itemsSchema);
const item1 = new Item({
    name : "Welcome to your todolist!"
});
const item2 = new Item({
    name : "Hit the + button to add a new item"
});
const item3 = new Item({
    name : "<-- Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];
const ListSchema = {
    name : String,
    items : [itemsSchema]
};

const List = mongoose.model("List",ListSchema);

// get request
app.get("/",function(req,res){
    const day = date.getDate();
    Item.find().then(function(foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems).then(function(){
                console.log("Successfully inserted the default items");
            });
            res.redirect("/");
        }
        else
            res.render("list",{listTitle:day, newlistitems:foundItems});
    });
});

// req params
app.get("/:customListName",function(req,res){
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name:customListName}).then(function(foundList){
        // console.log(foundList);
        if(!foundList){
            const list = new List({
                name : customListName,
                items : defaultItems
            });
            list.save();
            res.redirect("/"+customListName);
        }   
        else{
            if(foundList.items.length ===0)
            {
                foundList.items = defaultItems;
                foundList.save();
            }
            res.render("list",{listTitle:foundList.name, newlistitems:foundList.items});
        }
    });
});

// post request
app.post("/",function (req,res) {  
    const newtask  = req.body.newitem;
    const listName = req.body.list;
    const itemName = new Item({
        name : newtask
    });

    if(listName === date.getDate()){
        if(itemName.name != "")
            itemName.save();
        res.redirect("/");
    }
    else{
        List.findOne({name:listName}).then(function(foundList){
            if(itemName.name != "")
            {
                foundList.items.push(itemName);
                foundList.save();
            }
        });
        res.redirect("/" + listName);
    }
});



app.post('/delete',function(req,res){
    const checkedItemId = req.body.chkbox;
    const listname = req.body.listname;
    if(listname === date.getDate())
    {
        Item.deleteOne({_id:checkedItemId}).then(function(){
            res.redirect("/");
        });
    }
    else
    {
        List.findOneAndUpdate({ name: listname }, { $pull: {items:{_id:checkedItemId}}}).then(
            function () {
              res.redirect("/" + listname);
            }
          );
    }
});

app.listen(3000,function(req,res){
    console.log("server Listening to port 3000");
}); 