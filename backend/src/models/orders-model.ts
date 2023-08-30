import mongoose from "mongoose";
import { Types } from "mongoose";
import { OrderType } from "../types/type";

const orderSchema = new mongoose.Schema({
    products:[{
        product:{
            type:Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        street:{
            type:String,
            required:true},
        city:{
            type:String,
            required:true},
        sate:{
            type:String,
            required:true
        },
        zipcode:{
            type:String,
            required:true}, 
    },
    payment:{},

    userId:{
        type:String || Types.ObjectId,
        default:'No Account'
    },
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:[
            'Not Processed',
            'Processing',
            'Label Created',
            'Shipped',
            'Delivered'
        ]
    }
    
})

const Order = mongoose.model<OrderType>('User', orderSchema)

orderSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = (returnedObject._id as Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

export default Order