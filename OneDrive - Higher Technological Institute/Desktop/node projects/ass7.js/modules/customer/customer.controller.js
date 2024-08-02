import bcrypt from 'bcrypt'
import { db } from '../../database/dbConnection.js'
import { ObjectId } from 'mongodb'


const signup =async (req,res)=>{
    try{
    let {name, email,password,phone} = req.body
    const customerModel = db.collection("customers");

    const customerExist = await customerModel.findOne({email})
     if(customerExist){
      throw Error("customer alrady exist",{cause:409})
     }
     const hashedPassword = bcrypt.hashSync(password, 8);
     const customer = { name, email, password: hashedPassword, phone };
    const createdCustomer = await customerModel.insertOne(customer)
    if(createdCustomer.acknowledged == false){
      throw Error("faild to create user",{cause:500})
      }
      return res.status(201).json({message:"added successfully",success:true})
    
    }catch(error){
    return res.status(error.cause || 500).json({message: error.message, success:false})
    }
    }
const login = async (req,res,next)=>{
    try{
        const {email,password} = req.body
        const customerModel = db.collection('customers');

        const customer = await customerModel.findOne({ email });
        if (!customer) {
            throw Error("Customer not exist", { cause: 404 });
        }

        const isPasswordValid = bcrypt.compareSync(password, customer.password);
        if (!isPasswordValid) {
            throw Error("Invalid password", { cause: 401 });
        }
    return res.status(200).json({message :"login successfully",success:true,customer})

    }catch(error){
        return res.status(error.cause || 500).json({message: error.message, success:false})

    }
}
const getAllCustomers = async(req,res,next)=>{
try{
    const customerModel = db.collection('customers');
    const customers = await customerModel.find().toArray()
    return res.status(200).json({ message: "Users retrieved successfully", success: true, customers });
    }catch(error){
        return res.status(error.cause || 500).json({message: error.message, success:false})

    }
}
const getUserById = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const customerModel = db.collection('customers');

        if (!ObjectId.isValid(id)) {
            throw Error("Invalid ID format", { cause: 400 });
        }

        const customer = await customerModel.findOne({ _id: new ObjectId(id) });
        if (!customer) {
            throw Error("Customer not found", { cause: 404 });
        }

        return res.status(200).json({ message: "Customer retrieved successfully", success: true, customer });

    } catch (error) {
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    }
}
const updateUser = async (req, res) => {
    try {
       const {id}= req.params
       const {name,phone,userId} = req.body
       const customerModel = db.collection("customers");

        if(id != userId) return res.json({message: "you are not owner"})

       const {matchedCount} = await customerModel.updateOne(
        { _id: new ObjectId(id)}, {
        $set:{name,phone}
            })

if(!matchedCount) return res.json({message:"user not found"})

    return res.json({message:"updated successfully"})


    } catch (error) {
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    } }
const deleteUser = async(req,res) => { 
try{
    const {id}= req.params
    const {userId} = req.body
    const customerModel = db.collection("customers");
    if(id != userId) return res.json({message: "you are not owner"})

        const {deletedCount} = await customerModel.deleteOne(
            { _id: new ObjectId(id)}, )
            return deletedCount
            ? res.json({message:"deteted successfullyy"})
            : res.json({message:"user not found"})

} catch (error) {
        return res.status(error.cause || 500).json({ message: error.message, success: false });
    } 

}


    export{
        signup,
        login,
        getAllCustomers,
        getUserById,
        updateUser,
        deleteUser
    }
