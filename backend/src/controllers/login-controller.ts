import { Secret, sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { Request, Response} from 'express'
import User from "../models/user-model";
import { ParamsDictionary } from "express-serve-static-core"
import { UserRequest} from "../types/type";
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
        return res.status(401).json({
            Error:'Invalid Email Or Password'
        })
    }

    const userForToken = {
        email:user.email,
        id:user._id as Types.ObjectId
    }

    const token = sign(userForToken, SECRET as Secret)

    const cart = await Cart.findById(user.shoppingCart)

    const session = req.session.guestCart

    if(session && cart){
        if(cart.products.length === 0){
            
            await Cart.findByIdAndUpdate(
                user.shoppingCart,{
                    products:[...(cart.products),...(session.products) ],
                    cartTotal:cart.cartTotal + session.cartTotal,
                    cartPrice:evenRound(cart.cartPrice + session.cartPrice,2)
                }
            )
        }else{
            const indexedArray1 = new Map(cart.products.map((item) => [item.product.toString(), item]))
            for (const item2 of session.products) {
                const productIdStr = item2.product.toString();
                if (indexedArray1.has(productIdStr)) {
                    const item1 = indexedArray1.get(productIdStr);
                    item1 && (item1.quantity += item2.quantity);
                }else{
                    cart.products.push(item2)
                }
                }
            cart.cartTotal += session.cartTotal
            cart.cartPrice += session.cartPrice
            cart.cartPrice = evenRound(cart.cartPrice, 2)

            await cart.save()
            
        }
        res.clearCookie('connect.sid', { path: '/' })
        req.session.destroy(err => {
            if(err){
                res.send(err)
            }
        })
    }

    return res.status(200).send({
        token,
        email:user.email, 
        firstName:user.firstName,
        lastName:user.lastName,
        name:`${user.firstName} ${user.lastName}`,
        isAdmin:user.isAdmin,
        })
}

export default loginUser