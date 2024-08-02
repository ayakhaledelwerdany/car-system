import {Router} from 'express'
import { addData ,updateData,deleteData} from './rental.controller.js'
const rentalRouter = Router()


rentalRouter.post('/addData',addData)
rentalRouter.put('/updateData/:id',updateData)
rentalRouter.delete('/deleteData/:id',deleteData)



export default rentalRouter