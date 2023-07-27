import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { getDate } from "./date.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb+srv://tyler-admin:Password123!@cluster0.rmdkllu.mongodb.net/todolistDB");

// Create schema for collection
const itemsSchema = mongoose.Schema({
    name: String
});

// Create item model
const Item = mongoose.model("Item", itemsSchema);

// Create default items to be inserted into a new list
const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item.>"
});

const defaultItems = [item1, item2, item3];

// Create list schema
const listSchema = {
    name: String,
    items: [itemsSchema]
};

// Create list model
const List = mongoose.model("List", listSchema);

// Root get
app.get("/", (req, res) => {
    // Find the home list
    List.findOne({name: "home"})
        .then( (foundList) => {
            // If it doesn't exist
            if(!foundList) {
                // Create a new list       
                const list = new List({
                    name: "home",
                    items: defaultItems
                });

                list.save();
                res.redirect("/");
            } else {
                // Show existing list
                res.render("index.ejs", {
                    date: getDate(),
                    itemList: foundList.items,
                    page: "/"
                })
            }
        })
        .catch( (err) => {
            console.log(err);
        })
});

// Work get
app.get("/work", (req, res) => {
    // Find the work list
    List.findOne({name: "work"})
        .then( (foundList) => {
            // If it doesn't exist
            if(!foundList) {
                // Create a new list       
                const list = new List({
                    name: "work",
                    items: defaultItems
                });

                list.save();
                res.redirect("/");
            } else {
                // Show existing list
                res.render("index.ejs", {
                    date: "Work",
                    itemList: foundList.items,
                    page: "/work"
                })
            }
        })
        .catch( (err) => {
            console.log(err);
        })
});

// Root post
app.post("/", (req, res) => {
    // Create new item
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    // Find the list
    List.findOne({name: "home"})
        .then( (foundList) => {
            // Add the item
            foundList.items.push(item);
            foundList.save();

            // Redirect to root
            res.redirect("/");
        })
        .catch( (err) => {
            console.log(err);
        });
});

// Work post
app.post("/work", (req, res) => {
    // Create new item
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    // Find the list
    List.findOne({name: "work"})
        .then( (foundList) => {
            // Add the item
            foundList.items.push(item);
            foundList.save();

            // Redirect to work
            res.redirect("/work")
        })
        .catch( (err) => {
            console.log(err);
        });
});

app.post("/delete", (req, res) => {
    // Get item and list info
    const checkedItemId = req.body.checkbox;
    const pageName = req.body.pageName;
    var listName = "";

    // Set correct list name
    if (pageName === "/") {
        listName = "home";
    } else {
        listName = "work";
    }

    // Remove the selected item
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
        .then( () => {
            // Redirecto to correct route
            res.redirect(pageName);
        })
        .catch( (err) => {
            console.log(err);
        });
});

// Listening on heroku app port or 3000
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log("Server has started");
});