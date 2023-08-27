import { Secret, sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { Request, Response, response } from 'express'
import User from "../models/user-model";
import { ParamsDictionary } from "express-serve-static-core"
import { UserRequest} from "../types/type";
import SECRET from "../config/token-config";




const loginUser =  async(req:Request<ParamsDictionary, unknown, UserRequest>,res:Response) => {
    const {email,password} = req.body

    const user = await User.findOne({email})
    const passwordCorrest = user === null
    ? false
    : await compare(password, user.passwordHash)

    if(!(user && passwordCorrest)){
        return response.status(401).json({
            error:'invalid email or password'
        })
    }

    const userForToken = {
        email:user.email,
        id:user._id
    }

    const token = sign(userForToken, SECRET as Secret)

    return res.status(200)
            .send({token,email:user.email, name:user.name})
}

export default loginUser