import {  Request,Response} from 'express'
import { addToWishlist, removeFromWishlist } from '../services/wishlist-service'




const addWishList = async(req:Request,res:Response) => {
    const prodId = req.params.id
    const user = req.user
    const id = user.id
    try{
        const alreadyAdded = user.wishList?.find(id => id._id.toString() === prodId) 
        if(alreadyAdded) {
            const user = await removeFromWishlist(id,prodId)
            res.json(user)
        }else{
            const user = await addToWishlist(id,prodId)
            res.json(user)
        }
    }catch(error){
        res.status(500).json({
            Error:'An Error Has Occurred'
        })
    }
}


export default addWishList