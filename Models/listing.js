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
        type: String,
       
        default: "https://images.unsplash.com/photo-1742603096268-0efc93dcc95a?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === " " ? "https://images.unsplash.com/photo-1742603096268-0efc93dcc95a?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
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
        }]

});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in : listing.reviews}})
}});

const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;

