import mongoose from "mongoose";
import { ProductDb } from "../types/type";

const inventorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:String,
    price:{
        type:Number,
        required:true
    },
    onSale:{
        type:Boolean,
        default:false
    },
    salePercentage:{
        type:Number,
        validate: {
            validator: function (this: ProductDb, value: string) {
                if (this.onSale === true) {
                    return typeof value === 'number';
                }
                return true;
            },

            message: 'Sale percentage is required when the product is on sale.',
          },
    },
    salePrice:{
        type:Number,
    },
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
    }],
    imageFolder:String
},{
    timestamps:true
})

const Product = mongoose.model<ProductDb>('Product', inventorySchema)


inventorySchema.set('toJSON',{
    transform:(_document, returnObject) => {
        delete returnObject.__v
    }
})



export default Product

