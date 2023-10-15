import mongoose, { Schema,Types } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'
import isEmail from 'validator/lib/isEmail'
import { UserTypes } from "../types/type";



const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true},
    lastName:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[ isEmail, 'invalid email' ],
        trim:true,
        lowercase:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    wishList:[{
        type:Schema.Types.ObjectId,
        ref:'Product',

    }],
    shoppingCart:{
        type:Schema.Types.ObjectId,
        ref:'Cart'
    },
    reviews:[{
        product:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        },
        reviewDesc:String,
        rating:Number,
    }],
    orders:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }],
    stripeId:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
},{
    timestamps:true
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model<UserTypes>('User', userSchema)

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = (returnedObject._id as Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})



export default User