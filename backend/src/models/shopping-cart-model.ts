import mongoose, {Schema,Types} from "mongoose";
import { CartUserType} from "../types/type";


const cartSchema = new mongoose.Schema({
    products:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type:Number,
            required:true
        },
    }],
    cartTotal:Number,
    cartPrice:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},
{
    timestamps:true
})

const Cart = mongoose.model<CartUserType>('Cart', cartSchema)

cartSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = (returnedObject._id as Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default Cart