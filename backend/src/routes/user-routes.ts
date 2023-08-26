import express from 'express'
import { getUsers, addUser } from "../controller/user-controller";


const userRouter = express.Router()

userRouter.get('/',getUsers)
userRouter.post('/',addUser)

export default(userRouter)