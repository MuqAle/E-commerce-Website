import {  Request,Response} from 'express'
import {  WishListTypes } from '../types/type'
import { addToWishlist, removeFromWishlist } from '../services/wishlist-service'




const addWishList = (req:Request,res:Response) => {
    const {prodId} = req.body as WishListTypes
    const user = req.user
    const id = user.id
    try{
        const alreadyAdded = user?.wishList?.find(id => id.toString() === prodId) 
        if(alreadyAdded) {
            const user = removeFromWishlist(id,prodId)
            res.json(user)
        }else{
            const user = addToWishlist(id,prodId)
            res.json(user)
        }
    }catch(error){
        res.status(500).json({
            Error:'An Error Has Occurred'
        })
    }
}


export default addWishList