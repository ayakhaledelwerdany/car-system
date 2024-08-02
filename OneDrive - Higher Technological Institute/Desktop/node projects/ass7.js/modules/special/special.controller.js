import { db } from "../../database/dbConnection.js"



const carModel = db.collection('cars')


const getCarModel =async (req,res)=>{
try{
    const cars = await carModel.find({name:{$in:['Honda','Toyota']}}).toArray()
return cars.length ? res.json({message:"cars retrieved successfully",cars})
: res.json({message:"no car found"})
}
catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }

}

const getAvailableCarsWithSpecificModel = async (req,res,next)=>{
try{
    const cars = await carModel.find({name: req.query.name , rentalStatus:"available"}).toArray();
    return cars.length ? res.json({message:"cars retrieved successfully",cars})
    : res.json({message:"no car found"})


}catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}
const getRentedCarsOrWithSpecificModel = async (req,res,next)=>{
    try{
const {name} = req.query
const condition = {}
if(name){
    condition.name = name;
}else{
condition.rentalStatus ="rented"
}
const cars = await carModel.find(condition).toArray();

return cars.length ? res.json({message:"cars retrieved successfully",cars})
: res.json({message:"no car found"})


    
}catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}
const getRentedOrAvailableForSpecificModel =async (req,res,next)=>{
try{

const {name} = req.query

const cars = await carModel.find({$or:[{rentalStatus:"available",name},{rentalStatus:"rented",name}]}).toArray();
return cars.length ? res.json({message:"cars retrieved successfully",cars})
: res.json({message:"no car found"})
}    
catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
}


export{
    getCarModel,
    getAvailableCarsWithSpecificModel,
    getRentedCarsOrWithSpecificModel,
    getRentedOrAvailableForSpecificModel

}