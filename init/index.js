const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/EliteStay'
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

const initDB = async () =>{
     await Listing.deleteMany({});
     await Listing.insertMany(initData.data);
     console.log("Data was initialize")
};


