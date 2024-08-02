import { ObjectId } from "mongodb"
import { db } from "../../database/dbConnection.js"

const carModel = db.collection("cars")

const addCar = async(req,res)=>{
    try{
        let {name,model} = req.body
    
         await carModel.insertOne({name,model,rentalStatus:'available'})
         
          return res.status(201).json({message:"added successfully",success:true})
        
        }catch(error){
        return res.status(error.cause || 500).json({message: error.message, success:false})
        }
        }


const getAllCars = async(req,res)=>{
    try{
        const cars = await carModel.find().toArray()
        if(cars.length == 0) return res.json({message:"no cars found",success:false})
        return res.status(200).json({ message: "cars retrieved successfully", success: true, cars });
   
    }

catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}
const getCarById  = async(req,res)=>{
    try{
        const car = await carModel.findOne({_id: new ObjectId(req.params.id)})
        if(car.length == 0) return res.json({message:"no cars found",success:false})
        return res.status(200).json({ message: "car retrieved successfully", success: true, car });
    }

catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}

const updateCar = async (req,res)=>{
    try{
    const {id} = req.params
    const {name,model} = req.body
    const {matchedCount}= await carModel.updateOne({_id:new ObjectId(id)},{$set: {name, model}})
    return matchedCount ? res.json({message:"updated successfully"})
    : res.json({message:"car not found"})
}
catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}

const deleteCar = async (req,res)=>{
 try{
    const {id} = req.params
    const {deletedCount}= await carModel.deleteOne({_id:new ObjectId(id)})
    return deletedCount ? res.json({message:"deleted successfully"})
    : res.json({message:"car not found"})
 }
 catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}



export{
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar

}