import express from 'express'
import {getAllOrders,getOneOrder,updateOrder} from '../controllers/orders-controllers'


const orderRouter = express.Router()

orderRouter.get('/',getAllOrders),
orderRouter.get('/:id',getOneOrder)
orderRouter.put('/:id', updateOrder)

export default orderRouter