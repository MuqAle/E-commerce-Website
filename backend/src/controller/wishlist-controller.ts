import {  Request,Response} from 'express'
import { ParamsDictionary } from "express-serve-static-core"
import {  WishListTypes } from '../types/type'
import User from '../models/user-model'




const addWishList = async(req:Request<ParamsDictionary, unknown,WishListTypes>,res:Response) => {
    const {prodId} = req.body
    const {id} = req.user
    try{
        const user = await User.findByIdAndUpdate(id)
        const alreadyAdded = user?.wishList?.find(id => id.toString() === prodId) 
        if(alreadyAdded) {
            const user = await User.findByIdAndUpdate(id,
            {
                $pull:{wishList:prodId}
            },
            {
                new:true
            })
            res.json(user)
        }else{
            const user = await User.findByIdAndUpdate(id,
                {
                    $push:{wishList:prodId}  
                },
                {
                    new:true
                })
                res.json(user)
        }
    }catch(error){
        res.status(400).json({
            error:'An error has occurred'
        })
    }
}

export default addWishList