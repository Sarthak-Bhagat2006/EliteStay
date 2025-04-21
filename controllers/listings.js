const Listing = require("../Models/listing");

module.exports.index = async (req, res) => {
    const { category, search } = req.query;

    // Start with an empty query object
    let query = {};

    // Add search condition if present
    if (search) {
        const regex = new RegExp(search, 'i'); // case-insensitive
        query.country = { $regex: regex };
        
    }

    // Add category filter if it's not "Trending" or null
    if (category && category !== "Trending") {
        query.category = category;
    }

    // Fetch listings based on combined query
    let allListings = await Listing.find(query);

    // Ensure all listings have a valid price
    allListings.forEach(listing => {
        if (listing.price === undefined || listing.price === null) {
            listing.price = 0;
        }
    });

    // Render the final result
    res.render("listings/index", { allListings });
};

module.exports.new =  (req, res) => {
    
    res.render("listings/new");
}

module.exports.create = async (req, res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;    
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
    

}

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let originalUrl = listing.image.url;
    let newUrl = originalUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs", { listing, newUrl });
}

module.exports.update = async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
let {id} = req.params;

let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
if(typeof  req.file !== "undefined"){
let url = req.file.path;
let filename = req.filename;

listing.image = {url, filename};
await listing.save();
}
req.flash("success"," Listing Updated!");
res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted!");

    res.redirect("/listings");
}

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
     path :"reviews",populate:{path: "author"}}).populate("owner");
    if(!listing){
     req.flash("error","Listing is not available");
     res.redirect("/listings");
    }
    res.render("listings/show", { listing });
 }