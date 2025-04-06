const express = require("express")
const router = express.Router(); 
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../Models/listing");
const ExpressError = require("../utils/ExpressError");
const {listingSchema , reviewSchema} = require("../schema");


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
router.get("/new", (req, res) => {
    res.render("listings/new");
});

// CREATE ROUTE
router.post("/",
    validateListing,
     wrapAsync(async (req, res,next) => {
        
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");

})
);


// EDIT ROUTE
router.get("/:id/edit",
    wrapAsync (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})
);
// UPDATE route
router.put("/:id",
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


router.delete("/:id",
    wrapAsync (async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
);

// SHOW ROUTE
router.get("/:id",
    wrapAsync ( async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id).populate("reviews");
   res.render("listings/show", { listing });
})
);

module.exports = router;