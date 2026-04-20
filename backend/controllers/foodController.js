import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addFood = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image is required" });
    }

    console.log("👉 RAW price:", req.body.price);              
    const rawPrice = req.body.price?.toString().trim();        
    console.log("👉 Trimmed price:", rawPrice);               
    const price = Number(rawPrice);
    console.log("👉 Final number:", price);                    

    if (isNaN(price)) {
        return res.status(400).json({ success: false, message: "Invalid price. Must be a number." });
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// all food list
const listFood = async(req,res)=>{
    try{
        const foods =await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})        
    }

} 

// remove food item

const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})       
    }
}

export { addFood,listFood,removeFood}
