import mongoose from "mongoose";
import { Types } from "mongoose";


const inventorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    idProduct:String,
    type:String,
    price:{
        type:Number,
        required:[true,'price is required']
    },
    onSale:{
        type:Boolean,
        required:[true,'item should be specified if on sale']
    },
    salePercentage:Number,
    description:String,
    images:[Buffer]
})

const Product = mongoose.model('Product', inventorySchema)




inventorySchema.set('toJSON',{
    transform:(_document, returnObject) => {
        returnObject.id = (returnObject._id as Types.ObjectId).toString()
        delete returnObject._id
        delete returnObject._v
    }
})



export default Product

