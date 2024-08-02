import {Router} from 'express'
import { getCarModel,getAvailableCarsWithSpecificModel ,getRentedCarsOrWithSpecificModel,getRentedOrAvailableForSpecificModel} from './special.controller.js'
const specialRouter = Router()
specialRouter.get('/getCarModel',getCarModel)
specialRouter.get('/getAvailableCarsWithSpecificModel',getAvailableCarsWithSpecificModel)
specialRouter.get('/getRentedCarsOrWithSpecificModel',getRentedCarsOrWithSpecificModel)
specialRouter.get('/getRentedOrAvailableForSpecificModel',getRentedOrAvailableForSpecificModel)




export default specialRouter