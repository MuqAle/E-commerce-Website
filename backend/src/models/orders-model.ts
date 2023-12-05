import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";
import { OrderType } from "../types/type";

const orderSchema = new mongoose.Schema({
    products:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    shippingName:{
        type:String,
        required:true
    },
    shippingAddress:{
        line1:String,
        line2:String,
        postal_code:String,
        city:String,
        sate:String,
        
    },
    userId:{
        type:String || Schema.Types.ObjectId,
        default:'Guest User',
        ref:'User'
    },
    paymentIntentId:String,
    paymentType:String,
    billingDetails:{
        address:{
            line1:String,
            line2:String,
            postal_code:String,
            city:String,
            sate:String,
        },
        email:String,
        name:String
    },
    cardInfo:{
        brand:String,
        last4:String
    },
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:[
            'Not Processed',
            'Processing',
            'Label Created',
            'Shipped',
            'Delivered',
            'Canceled'
        ]
    },
    shippingCost:Number,
    shippingMethod:String,
    tax:Number,
    subtotal:Number,
    total:Number,
    
},{
    timestamps:true
})

const Order = mongoose.model<OrderType>('Order', orderSchema)

orderSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = (returnedObject._id as Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default Order