/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose"
import User from "../models/user-model"
import Cart from "../models/shopping-cart-model"
import { Request, Response } from "express"
import { CartSessionTypes, CartUserType, ProductDb} from "../types/type"
import Product from "../models/product-model"


interface CartType {
    product:{
        _id:mongoose.Types.ObjectId,
        price:number
    }
    quantity:number,
    _id:mongoose.Types.ObjectId
}

const getAllCart = async(_req:Request,res:Response) => {
    const cart:CartUserType[] = await Cart.find({}).populate('products.product', {name:1,price:1})
    
     res.json(cart)
}


const addToCart = async (req:Request,res:Response) => {
    const productId = req.params.id

    const cartItems = {
        product:new mongoose.Types.ObjectId(productId),
        quantity:1
    }
    try{
        if(req.user){
            const userId = req.user.id 
            const user = await User.findById(userId)
            const cart = await Cart.findById(user?.shoppingCart).populate('products.product',{price:1}) 
            const foundObject = cart?.products.find(product => productId === product.product.id.toString()) as CartType | undefined
            const product = await Product.findById(productId) as ProductDb
            if(!foundObject){
               
                await Cart.findByIdAndUpdate(cart?._id,
                    {
                    $push:{products:cartItems},
                    $inc:{cartTotal:cartItems.quantity, cartPrice: cartItems.quantity * product.price },
                    },
                    { 
                    new:true
                    })
            }else{
               foundObject.quantity += 1
               if(cart){
                cart.cartPrice += product.price
                cart.cartTotal += 1
               }
            }
            await cart?.save()
            console.log('Cart:', cart)
            res.json(cart)
            
        }
        else{
            let anonCart =  req.cookies.anonymousCart as Array<CartSessionTypes>
            const foundObject = anonCart.find(product => productId === product.product.toString())
            if(!anonCart){
                anonCart = []
                anonCart.push(cartItems)
            }if(foundObject){
                foundObject.quantity += 1
            }else{
                anonCart.push(cartItems)
            }
        }
        
        
    }catch(error){
        res.status(400)
        console.log(error)
    }
   
}

const deleteFromCart = async (req:Request,res:Response) => {

    const productId = req.params.id

    try{
        if(req.user){
            const userId = req.user.id 
            const user = await User.findById(userId)
            const cart = await Cart.findById(user?.shoppingCart).populate('products.product',{price:1}) 
            const foundObject = cart?.products.find(product => productId === product.product.id.toString()) as CartType | undefined
            const product = await Product.findById(productId) as ProductDb

            if(foundObject){
                await Cart.findByIdAndUpdate(cart?._id,
                    {
                    $pull:{products:{product:productId}},
                    $inc:{cartTotal: -foundObject.quantity, cartPrice: -(foundObject.quantity * product.price) }
                    },
                    { 
                    new:true
                    })
            }
             const updatedCart = await cart?.save()
            res.json(updatedCart)
        }else{
            const anonCart =  req.cookies.anonymousCart as Array<CartSessionTypes>
            const foundIndex = anonCart.findIndex(product => productId === product.product.toString())
            anonCart.splice(foundIndex,1)
            res.status(200)
        }
    }catch(error){
        res.status(400)
        console.log(error)
    }
}

const reductionCart = async (req:Request,res:Response) => {

    const productId = req.params.id

    try{
        if(req.user){
            const userId = req.user.id 
            const user = await User.findById(userId)
            const foundObject = user?.shoppingCart?.find(product => productId === product.product.toString())
            if(foundObject && foundObject.quantity > 1){
                foundObject.quantity -= 1
            }else{
                await User.findByIdAndUpdate(userId,
                    {
                    $pull:{shoppingCart:{product:productId}},
                    },
                    { 
                    new:true
                    })
            }
             const updatedUser = await user?.save()
            res.json(updatedUser)
        }else{
            const anonCart =  req.cookies.anonymousCart as Array<CartSessionTypes>
            const foundProduct = anonCart.find(product => productId === product.product.toString())
            const foundIndex = anonCart.findIndex(product => productId === product.product.toString())
            if(foundProduct && foundProduct.quantity > 1){
                foundProduct.quantity -= 1
            }else{
                anonCart.splice(foundIndex,1)
            }
            res.status(200)
        }
    }catch(error){
        res.status(400)
        console.log(error)
    }
}




export {addToCart,
    deleteFromCart,
    reductionCart,
    getAllCart}

