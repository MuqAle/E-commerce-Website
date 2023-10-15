import mongoose, { Schema } from "mongoose";
import { SessionTypes } from "../types/type";


const sessionSchema = new Schema({
    _id: String, 
    expires: Date,
    session: {
      cookie: {
        originalMaxAge: Number,
        expires: Date,
        secure: Boolean,
        httpOnly: Boolean,
        domain: String,
        path: String,
        sameSite: String,
      },
      guestCart: {
        products: [
          {
            product:{
              type:Schema.Types.ObjectId,
              ref:'Product'
            }, 
            quantity: Number,
          },
        ],
        cartPrice: Number,
        cartTotal: Number,
      },
    },
  });


const Session = mongoose.model<SessionTypes>('Session', sessionSchema);

export default Session