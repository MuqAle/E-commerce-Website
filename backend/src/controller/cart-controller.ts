import User from "../models/user-model"
import { Request, Response } from "express"
import { CartTypes } from "../types/type"
import mongoose from "mongoose"



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
            const foundObject = user?.shoppingCart?.find(product => productId === product.product.toString())
            if(!foundObject){
                await User.findByIdAndUpdate(userId,
                    {
                    $push:{shoppingCart:cartItems},
                    },
                    { 
                    new:true
                    })
            }else{
                foundObject.quantity += 1
            }
            res.status(201).json(user)
        }
        else{
            let anonCart =  req.cookies.anonymousCart as Array<CartTypes>
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
    }
   
}
export {addToCart}