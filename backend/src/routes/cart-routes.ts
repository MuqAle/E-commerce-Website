import express from 'express'
import { addToCart,deleteFromCart,getAllCart,reductionCart } from '../controller/cart-controller'

const cartRouter = express.Router()


cartRouter.put('/cart-add/:id',addToCart )
cartRouter.put('/cart-delete/:id',deleteFromCart)
cartRouter.put('/cart-decrease/:id', reductionCart)
cartRouter.get('/cart',getAllCart)

export default cartRouter