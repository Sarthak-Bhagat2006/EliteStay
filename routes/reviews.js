const express = require("express")
const router = express.Router({mergeParams:true}); 
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema , reviewSchema} = require("../schema");
const Review = require("../Models/reviews");
const Listing = require("../Models/listing");
const {isLoggedIn,isOwner, isAuthor} = require("../middlewares")


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
router.post("/",isLoggedIn, validateReview,
    wrapAsync (async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Added");

    res.redirect(`/listings/${listing._id}`);
}));

// delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,
    wrapAsync(async (req, res) => {
      const { id, reviewId } = req.params;
      
      // Delete the review and remove reference from listing
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      
      req.flash("success", "Review Deleted");
      res.redirect(`/listings/${id}`);
    })
  );

module.exports = router;