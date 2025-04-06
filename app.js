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

const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
        if(error){
            throw new ExpressError(400,error);
        }else{
            next();
        }
}

const validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

// INDEX ROUTE
app.get("/listings",
    wrapAsync (async (req, res) => {
    const allListings = await Listing.find({});
    
    // Ensure all listings have a valid price
    allListings.forEach(listing => {
        if (listing.price === undefined || listing.price === null) {
            listing.price = 0;  // Default to 0 if price is missing
        }
    });

    res.render("listings/index", { allListings });
})
);

// NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// CREATE ROUTE
app.post("/listings",
    validateListing,
     wrapAsync(async (req, res,next) => {
        
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");

})
);


// EDIT ROUTE
app.get("/listings/:id/edit",
    wrapAsync (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})
);
// UPDATE route
app.put("/listings/:id",
    wrapAsync ( async (req,res)=>{
        if(!req.body.listing){
            throw new ExpressError(400,"send valid data for listing");
        }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings`);
})
);

//DELETE route


app.delete("/listings/:id",
    wrapAsync (async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
);

//Review route
//post review
app.post("/listings/:id/reviews",validateReview,
    wrapAsync (async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

// delete review
app.delete("/listings/:id/reviews/:reviewID",
     wrapAsync(async (req,res) =>{
    let {id, reviewID} = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID }});
    await Review.findByIdAndDelete(reviewID);

    res.redirect(`/listings/${id}`);
}));

// SHOW ROUTE
app.get("/listings/:id",
     wrapAsync ( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show", { listing });
})
);



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
