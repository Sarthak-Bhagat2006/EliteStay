const mongoose = require("mongoose");
const Review = require("./reviews")


const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
        require: true,
    },
    image:{
        url: String,
        filename: String
    },
    price:{
        type: Number,
        
    },
    location:{
        type: String,
        require: true,
    },
    country:{
        type: String,
        require: true,
    },
    reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in : listing.reviews}})
}});

const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;

