import mongoose, { Schema,Types } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'
import isEmail from 'validator/lib/isEmail'
import { UserTypes } from "../types/type";


const userSchema = new mongoose.Schema({
    name:String,
    emailAddress:{
        type:String,
        required:true,
        unique:true,
        validate:[ isEmail, 'invalid email' ]
    },
    passwordHash:{
        type:String,
        required:true
    },
    wishList:[{
        type:Schema.Types.ObjectId,
        ref:'Product',

    }],
    shoppingCart:[{
        product:{
        type:Schema.Types.ObjectId,
        ref:'Product'},
        quantity:Number
    }],
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    orders:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }]
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model<UserTypes>('User', userSchema)

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = (returnedObject._id as Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})



export default User