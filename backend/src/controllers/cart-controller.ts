/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Types } from "mongoose"
import { addToCartGuest, 
    addToCartUser,
    deleteFromCartGuest,
    deleteFromCartUser,
    reduceFromCartGuest,
    reduceFromCartUser} from "../services/cart-service"
import Cart from "../models/shopping-cart-model"
import { NextFunction, Request, Response } from "express"
import {  CartTypes, ProductDb} from "../types/type"
import Product from "../models/product-model"






const getAllCart = async(_req:Request,res:Response,) => {
    const cart:CartTypes[] = await Cart.find({}).populate('products.product', {name:1,price:1})

     res.json(cart)
}

const addToCart = async (req:Request,res:Response,next:NextFunction) => {
    const productId = req.params.id
    const cartItems = {
        product:new Types.ObjectId(productId),
        quantity:1
    }
    try{
        const product = await Product.findById(productId) as ProductDb
        const user = req.user

        if(product){

            if(user){
                const updatedCart = addToCartUser(user,productId,cartItems,product)
    
                res.status(200).json(updatedCart)
            }
            else{
                const guestCart = req.session.guestCart as CartTypes
                
                const newGuestCart = addToCartGuest(guestCart,cartItems,productId,product)
    
                req.session.guestCart = newGuestCart
       
                res.status(200).json(newGuestCart)
            }
        }else{
            res.status(404).json({Error:'Item Not Found'})
        }

    }catch(error){
        next()
    }
   
}

const deleteFromCart = async (req:Request,res:Response,next:NextFunction) => {

    const productId = req.params.id
    const user = req.user

    try{
        if(user){
            const updatedCart = await deleteFromCartUser(user,productId)
            if(updatedCart){
                res.status(updatedCart.status).json(updatedCart.response)
            }
        }else{
            const guestCart =  req.session.guestCart as CartTypes
            const updatedCart = await deleteFromCartGuest(guestCart,productId)
  
            res.status(updatedCart.status).json(updatedCart.response)
        }

    }catch(error){
        next()
    }
}




const reductionCart = async (req:Request,res:Response,next:NextFunction) => {

    const productId = req.params.id

    try{
        if(req.user){
            const updatedCart = await reduceFromCartUser(req.user,productId)
            if(updatedCart){
                res.status(updatedCart?.status).json(updatedCart?.response)
            }
        }else{
            const guestCart = req.session.guestCart
            if(guestCart){
                if(guestCart.products.length < 1){
                    res.status(400).json({Error:'No Items In Cart'})
                }else{
                   const updatedGuestCart =  await reduceFromCartGuest(guestCart,productId)
                   res.status(updatedGuestCart.status).json(updatedGuestCart.response)
                }
            }
        }
    }catch(error){
        next()
        console.log(error)
    }
}





export {addToCart,
    deleteFromCart,
    reductionCart,
    getAllCart}

