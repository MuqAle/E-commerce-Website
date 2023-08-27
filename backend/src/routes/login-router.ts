import loginUser from "../controller/login-controller";
import express from 'express'

const loginRouter = express.Router()

loginRouter.post('/',loginUser)

export default loginRouter