import { Types } from "mongoose"
import User from "../models/user-model"


const addToWishlist = async (id:Types.ObjectId,prodId:string) => {
    const user = await User.findByIdAndUpdate(id,
        {
            $push:{wishList:prodId}
        },
        {
            new:true
        }).populate({
            path: 'wishList',
            model: 'Product', 
            select: 'name price images onSale salePercentage salePrice type stock' 
          })
    return user
}


const removeFromWishlist = async (id:Types.ObjectId,prodId:string) => {
    const user = await User.findByIdAndUpdate(id,
        {
            $pull:{wishList:prodId}  
        },
        {
            new:true
        }).populate({
            path: 'wishList',
            model: 'Product', 
            select: 'name price images onSale salePercentage salePrice type' 
          })
    return user
}

export {addToWishlist,removeFromWishlist}