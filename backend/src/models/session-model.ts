import mongoose from "mongoose";
import { SessionTypes } from "../types/type";


const sessionSchema = new mongoose.Schema({
    _id: String, // The session ID as a string
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
            product: mongoose.Schema.Types.ObjectId, // Assuming product is referenced by ObjectId
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