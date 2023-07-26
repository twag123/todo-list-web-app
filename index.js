import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { getDate } from "./date.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var homeList = [];
var workList = [];



// Root get
app.get("/", (req, res) => {
    // Render home page
    res.render("index.ejs", {
        date: getDate(),
        itemList: homeList,
        page: "/"
    });
});

app.get("/work", (req, res) => {
    // Render the work page
    res.render("work.ejs", {
        date: getDate(),
        itemList: workList,
        page: "/work"
    })
});

// Root post
app.post("/", (req, res) => {
    // Add new item to today's list
    homeList.push(req.body.newItem);
    
    // Redirect to root get
    res.redirect("/");
});

// Work post
app.post("/work", (req, res) => {
    // Add new item to the work list
    workList.push(req.body.newItem);

    // Redirect to work get
    res.redirect("/work");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});