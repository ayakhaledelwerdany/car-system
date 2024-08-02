import {Router} from 'express'
import { signup,login,getAllCustomers ,getUserById,updateUser,deleteUser} from './customer.controller.js'
const customerRouter = Router()
customerRouter.post('/signup',signup)
customerRouter.post('/login',login)
customerRouter.get('/getAllCustomers',getAllCustomers)
customerRouter.get('/getUserById/:id',getUserById)
customerRouter.put('/updateUser/:id',updateUser)
customerRouter.delete('/deleteUser/:id',deleteUser)






export default customerRouter