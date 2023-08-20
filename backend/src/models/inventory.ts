import mongoose from "mongoose";
import { Types } from "mongoose";
import allData from "../../assets/data/all-products";
import { Product } from "../type";

const inventorySchema = new mongoose.Schema<Product>({
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
    Gallery:[Buffer],
})

const Product = mongoose.model<Product>('Product', inventorySchema)

const importData = async () => {
    for (const entry of allData){
        const {name,type,idProduct,price,onSale,salePercentage,description,Gallery} = entry
        
        const product = new Product({
            name,
            idProduct,
            type,
            price,
            onSale,
            salePercentage,
            description,
            Gallery
        })

        await product.save()
    }

    console.log('inventory has been saved to MongoDb')
}


inventorySchema.set('toJSON',{
    transform:(document, returnObject) => {
        returnObject.id = (returnObject._id as Types.ObjectId).toString()
        delete returnObject._id
        delete returnObject._v
    }
})

importData()
    .then(() => mongoose.disconnect())
    .catch(error => {
        
        console.log('Error:',error)
    })

export default Product

