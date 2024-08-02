import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js";


const addData = async (req, res) => {
    try {
        const { customerId, carId, returnDate, rentalDate } = req.body;
        const carModel = db.collection('cars');
        const customerModel = db.collection('customers');
        const rentalModel = db.collection('rentals');

        const userExist = await customerModel.findOne({ _id: new ObjectId(customerId) });
        if (!userExist) return res.json({ message: "Customer does not exist" });

        const carExist = await carModel.findOne({ _id: new ObjectId(carId) });
        if (!carExist) return res.json({ message: "Car does not exist" });

        const overlappingRental = await rentalModel.findOne({
            carId: new ObjectId(carId),
            $or: [
                { rentalDate: { $lt: new Date(returnDate) }, returnDate: { $gt: new Date(rentalDate) } }
            ]
        });

        if (overlappingRental) return res.json({ message: "Car is not available for the selected dates" });

        await carModel.updateOne({ _id: new ObjectId(carId) }, { $set: { rentalStatus: "rented" } });

        await db.collection('rentals').insertOne({
            customerId: new ObjectId(customerId),
            carId: new ObjectId(carId),
            returnDate : new Date(returnDate),
            rentalDate: new Date(rentalDate)
        });

        return res.json({ message: "Rented successfully" });
    } catch (error) {
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    }
};

const updateData = async(req,res)=>{
    try{
        const {id} = req.params
        const {returnDate} = req.body
        const {matchedCount}= await db.collection("rentals").updateOne({_id : new ObjectId(id)},{$set:{returnDate:new Date(returnDate)}})

        return matchedCount?  res.json({message:"updated"}): res.json({message:"invalid id"})

    }catch (error) {
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    } 
}
const deleteData = async(req,res)=>{
    try{
        const {id} = req.params
        const {deletedCount}= await db.collection("rentals").deleteOne({_id : new ObjectId(id)})

        return deletedCount?  res.json({message:"deleted successfully"}): res.json({message:"invalid id"})

    }catch (error) {
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    } 
}



export{
    addData,
    updateData,
    deleteData
}