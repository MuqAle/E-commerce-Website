import express from 'express'
import { addToCart,deleteFromCart,getAllCart,getUserCart,reductionCart } from '../controllers/cart-controller'

const cartRouter = express.Router()


cartRouter.put('/add/:id',addToCart )
cartRouter.put('/delete/:id',deleteFromCart)
cartRouter.put('/decrease/:id', reductionCart)
cartRouter.get('/',getAllCart),
cartRouter.get('/user-cart',getUserCart)

export default cartRouter