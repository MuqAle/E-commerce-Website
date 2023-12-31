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
import Session from "../models/session-model"





const getAllCart = async(_req:Request,res:Response) => {
    const cart:CartTypes[] = await Cart.find({}).populate('products.product', {name:1,price:1})

     res.json(cart)
}

const getUserCart = async(req:Request,res:Response) => {
    try{if(req.user){
        const cart = await Cart.findById(req.user.shoppingCart).populate('products.product', {
            sold:0,
            reviews:0,
            imageFolder:0})
        return res.json(cart)
    }if(req.session && req.session.guestCart){
        const session = req.session.id
        const sessionCart = await Session.findById(session).populate('session.guestCart.products.product',{
            sold:0,
            reviews:0,
            imageFolder:0})
        return res.json(sessionCart?.session.guestCart)
    }
    if(!req.session.guestCart){
        const session = {
            products:[] as unknown as CartTypes['products'],
            cartPrice:0,
            cartTotal:0
        } 
        req.session.guestCart = session
        return res.json(req.session.guestCart)
    }
    else{
        return res.status(404).json({Error:'No shopping cart found'})
    }}catch(error){
        return res.status(500).json({Error:'Internal System Error'})
    }
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
            if(product.stock === 0){
                res.status(400).json({Error:'Item Out Of Stock'})
            }else{
                if(user){
                    const updatedCart = await addToCartUser(user,productId,cartItems,product)
        
                    res.status(200).json(updatedCart)
                }
                else{
                    const guestItems = {
                        product:new Types.ObjectId(productId),
                        quantity:1
                    }
                    const guestCart = req.session.guestCart as CartTypes
                    
                    const newGuestCart = addToCartGuest(guestCart,guestItems,productId,product)
        
                    const sessionCart = await Session.findByIdAndUpdate(req.session.id,{
                        'session.guestCart':newGuestCart
                    },{ new:true,
                        runValidators:true,
                        context:'query'})
                        .populate('session.guestCart.products.product',{stock:0,sold:0,reviews:0,imageFolder:0},)

                    res.status(200).json(sessionCart?.session.guestCart)
                }
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
            if(guestCart.products.length <= 0){
                res.status(400).json({Error: 'No Items In Cart'})
            }
            const updatedCart = await deleteFromCartGuest(guestCart,productId,req.session.id)

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
                   const updatedGuestCart =  await reduceFromCartGuest(guestCart,productId,req.session.id)
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
    getAllCart,
    getUserCart}

