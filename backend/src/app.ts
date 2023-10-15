import express from 'express'
import { Request } from 'express'
import mongoose from 'mongoose'
import {MONGODB_URI} from './config/config'
import cors from 'cors'
import productRouter from './routes/product-routes'
import { tokenExtractor, userExtractor} from './middleware/jwt-middleware'
import userRouter from './routes/user-routes'
import loginRouter from './routes/login-router'
import userReqRouter from './routes/user-req-routes'
import session from 'express-session'
import cartRouter from './routes/cart-routes'
import cookieParser from 'cookie-parser'
import checkoutRouter from './routes/checkout-routes'
import { sessionOptions} from './middleware/express-session'
import orderRouter from './routes/order-routes'
import errorHandler from './middleware/error-handler'





const app = express()

mongoose.set('strictQuery',false)



const dbConnect = async() => {
    try{
        if(MONGODB_URI){
            await mongoose.connect(MONGODB_URI)
            console.log('connected to db')
        }
       
    }catch(error){
        if(error instanceof Error){
            console.log(`Error, ${error.message}`)
        }
    }
}

dbConnect().catch(db => console.log(db.error))



app.use(cors<Request>({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf.toString();
      }
}))
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser())
app.use(session(sessionOptions))
app.use(tokenExtractor)
app.use('/api/user-req', userExtractor,userReqRouter)
app.use('/api/products',productRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/cart',userExtractor,cartRouter)
app.use('/api/checkout',userExtractor,checkoutRouter)
app.use('/api/orders',userExtractor,orderRouter)
app.use(errorHandler)


export default app

