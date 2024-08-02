import {Router} from 'express'
import { addCar,getAllCars ,getCarById,updateCar,deleteCar} from './car.controller.js'
const carRouter = Router()
carRouter.post('/addCar',addCar)
carRouter.get('/getAllCars',getAllCars)
carRouter.get('/getCarById/:id',getCarById)
carRouter.put('/updateCar/:id',updateCar)
carRouter.delete('/deleteCar/:id',deleteCar)






export default carRouter