import { Secret, sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { Request, Response, response } from 'express'
import User from "../models/user-model";
import { ParamsDictionary } from "express-serve-static-core"
import { UserRequest,CartTypes} from "../types/type";
import {SECRET} from "../config/config";
import { Types } from "mongoose";
import Cart from "../models/shopping-cart-model";
import evenRound from "../utils/rounding";




const loginUser =  async(req:Request<ParamsDictionary, unknown, UserRequest>,res:Response) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    const passwordCorrect = user === null
    ? false
    : await compare(password, user.passwordHash)

    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error:'invalid email or password'
        })
    }

    const userForToken = {
        email:user.email,
        id:user._id as Types.ObjectId
    }

    const token = sign(userForToken, SECRET as Secret)

    const cart = await Cart.findById(user.shoppingCart)

    const session = req.session.guestCart

    if( session && cart){


        if(cart.products.length as number === 0){
            
            await Cart.findByIdAndUpdate(
                user.shoppingCart,{
                    products:[...(cart.products as CartTypes['products']),...(session.products as CartTypes['products']) ],
                    cartTotal:cart.cartTotal + session.cartTotal,
                    cartPrice:evenRound(cart.cartPrice + session.cartPrice,2)
                }
            )
        }else{
            const indexedArray1 = new Map(cart.products.map((item) => [item.product.toString(), item]));
            for (const item2 of session.products) {
                const productIdStr = item2.product.toString();
                if (indexedArray1.has(productIdStr)) {
                    const item1 = indexedArray1.get(productIdStr);
                    item1 && (item1.quantity += item2.quantity);
                } 
                }
            cart.cartTotal += session.cartTotal
            cart.cartPrice += session.cartPrice
            evenRound(cart.cartPrice, 2)

            await cart.save()
            
        }
       
        req.session.guestCart = {
            products:[] as unknown as CartTypes["products"] ,
            cartPrice:0,
            cartTotal:0
        } 
    }

    

    return res.status(200).send({token,email:user.email, name:user.name})
}

export default loginUser