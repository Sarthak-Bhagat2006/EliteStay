const express = require("express")
const router = express.Router({mergeParams:true}); 
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema , reviewSchema} = require("../schema");
const Review = require("../Models/reviews");
const Listing = require("../Models/listing");


const validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}



//Review route
//post review
router.post("/",validateReview,
    wrapAsync (async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

// delete review
router.delete("/:reviewID",
     wrapAsync(async (req,res) =>{
    let {id, reviewID} = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID }});
    await Review.findByIdAndDelete(reviewID);

    res.redirect(`/listings/${id}`);
}));


module.exports = router;