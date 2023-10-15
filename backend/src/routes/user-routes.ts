import express from 'express'
import { getUsers, addUser, deleteUser } from "../controllers/user-controller";
import { userExtractor } from '../middleware/jwt-middleware';


const userRouter = express.Router()

userRouter.get('/',getUsers)
userRouter.post('/',addUser)
userRouter.delete('/',userExtractor,deleteUser)


export default userRouter