const express = require("express")
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../Models/listing");
const ExpressError = require("../utils/ExpressError");
const {listingSchema , reviewSchema} = require("../schema");
const {isLoggedIn, isOwner} = require("../middlewares");


const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
        if(error){
            throw new ExpressError(400,error);
        }else{
            next();
        }
}

// INDEX ROUTE
router.get("/",
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
router.get("/new",isLoggedIn, (req, res) => {
    
    res.render("listings/new");
});

// CREATE ROUTE
router.post("/",isLoggedIn,
    validateListing,
     wrapAsync(async (req, res,next) => {
        
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");

})
);


// EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,
    wrapAsync (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})
);
// UPDATE route
router.put("/:id",isLoggedIn,isOwner,
    wrapAsync ( async (req,res)=>{
        if(!req.body.listing){
            throw new ExpressError(400,"send valid data for listing");
        }
    let {id} = req.params;
    
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success"," Listing Updated!");

    res.redirect(`/listing/${id}`);
})
);

//DELETE route


router.delete("/:id",isLoggedIn,isOwner,
    wrapAsync (async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted!");

    res.redirect("/listings");
})
);

// SHOW ROUTE
router.get("/:id",
    wrapAsync ( async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id).populate({
    path :"reviews",populate:{path: "author"}}).populate("owner");
   if(!listing){
    req.flash("error","Listing is not available");
    res.redirect("/listings");
   }
   res.render("listings/show", { listing });
})
);

module.exports = router;