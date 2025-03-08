// const mongoose=require('mongoose');  
// require('dotenv').config();
 

// const connectDB=async ()=>{
//     try{
//          await mongoose.connect(process.env.MONGODB_URL);
//         console.log("Databse Connected...");
//         if (!process.env.MONGODB_URL) {
//             throw new Error("MongoDB URI is missing. Check your .env file.");
//         }
//     }catch(err){
//         console.log(err.message);   
//         process.exit(1);
//     }
// } 
 
// module.exports=connectDB


const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL;
    if (!mongoURI) {
      throw new Error("❌ MongoDB URI is missing. Check your .env file.");
    }

    await mongoose.connect(mongoURI, { 
      dbName: "pixoProduct", 
    });

    console.log("✅ Database Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
 