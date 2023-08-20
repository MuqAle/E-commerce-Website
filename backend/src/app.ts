import express from 'express'
import { Request } from 'express'
import mongoose from 'mongoose'
import MONGODB_URI from './config/db-config'
import cors from 'cors'


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

app.use(cors<Request>())
app.use(express.json())

