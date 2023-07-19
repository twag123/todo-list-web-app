import express from "express";
import { dirname } from "path";

import bodyParser from "body-parser";

import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var homeList = [];
var workList = [];

// Get current date as a formatted string
function getDate() {
    var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];

    var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];

    var dateObj = new Date();

    var dayName = days[dateObj.getDay()];
    var month = months[dateObj.getMonth()];
    var dayNumb = dateObj.getDate().toString();

    return (dayName + ', ' + month + ' ' + dayNumb);
}

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