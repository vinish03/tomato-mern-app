import mongoose from "mongoose";

 export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://vinish:Vinish0143@cluster0.javdlvo.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}