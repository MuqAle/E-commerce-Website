import mongoose, { Schema,Types } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'



const userSchema = new mongoose.Schema({
    name:String,
    emailAddress:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    wishList:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    shoppingCart:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    orders:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }],
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Product'

    }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = (returnedObject._id as Types.ObjectId).toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})

export default userSchema