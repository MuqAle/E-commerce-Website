import mongoose from "mongoose";
import { Types } from "mongoose";
import { ProductDb } from "../types/type";

const inventorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    type:String,
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    onSale:{
        type:Boolean,
        required:[true,'Item should be specified if on sale']
    },
    salePercentage:Number,
    description:String,
    stock:{
        type:Number,
        required:[true,'Must know how many in stock']
    },
    sold:{
        type:Number,
        default:0
    },
    metal:{
        type:String,
        enum:['gold','silver','brass']
    },
    colors:[String],
    overallRating:{
        type:Number,
        default:0},
    reviews:[{
        postedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        reviewDesc: String,
        rating: Number,
        datePosted:{
            type:Date,
            default:Date.now()
        }
    }],
    images:[{
        type:String,
        required:[true,'an image must be uploaded']
    }]
})

const Product = mongoose.model<ProductDb>('Product', inventorySchema)


inventorySchema.set('toJSON',{
    transform:(_document, returnObject) => {
        returnObject.id = (returnObject._id as Types.ObjectId).toString()
        delete returnObject._id
        delete returnObject._v
    }
})



export default Product

