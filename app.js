const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {listingSchema , reviewSchema} = require("./schema");
const Review = require("./Models/reviews");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing");
const reviews = require("./routes/reviews");


const MONGO_URL = "mongodb://127.0.0.1:27017/EliteStay";

async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req, res) => {
    res.send("working");
});

const sessionOption = {
    secret : "mySuperSecreteString",
    resave: false,
    saveUninitialized : true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    next();
})
app.use((req,res,next)=>{
    res.locals.error = req.flash("error");
    next();
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err,req,res,next)=>{
    let{statusCode = 500, message = "Something Went Wrong!"} = err;
    res.status(statusCode).render("error.ejs",{ message });
});


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
