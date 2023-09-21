import {  Request,Response} from 'express'
import {  WishListTypes } from '../types/type'
import User from '../models/user-model'
import { addToWishlist, removeFromWishlist } from '../services/wishlist-service'




const addWishList = async(req:Request,res:Response) => {
    const {prodId} = req.body as WishListTypes
    const {id} = req.user
    try{
        const user = await User.findByIdAndUpdate(id)
        const alreadyAdded = user?.wishList?.find(id => id.toString() === prodId) 
        if(alreadyAdded) {
            const user = removeFromWishlist(id,prodId)
            res.json(user)
        }else{
            const user = addToWishlist(id,prodId)
            res.json(user)
        }
    }catch(error){
        res.status(400).json({
            Error:'An Error Has Occurred'
        })
    }
}


export default addWishList