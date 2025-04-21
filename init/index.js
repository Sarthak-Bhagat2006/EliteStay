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
    initData.data =  initData.data.map((obj)=>({...obj,owner: '67fbd8c35a646ee940bd2eed'}))
     await Listing.insertMany(initData.data);
     console.log("Data was initialize")
};
initDB();


