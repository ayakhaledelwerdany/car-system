import express from 'express'
import { connectDB } from './database/dbConnection.js'
import customerRouter from './modules/customer/customer.routes.js'
import carRouter from './modules/car/car.routes.js'
import specialRouter from './modules/special/special.routes.js'
import rentalRouter from './modules/rental/rental.routes.js'
const app = express()
const port = 3000
app.use(express.json())
app.use('/customers', customerRouter)
app.use('/specials',specialRouter)
app.use('/cars',carRouter)
app.use('/rentals',rentalRouter)
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))