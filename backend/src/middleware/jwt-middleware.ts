import { NextFunction, Request, Response } from "express";
import { Secret, verify} from 'jsonwebtoken'
import User from "../models/user-model";
import SECRET from "../config/token-config";

interface CustomRequest extends Request{
    token: string | null 
    user?: Record<string,unknown> | null | undefined
}
const tokenExtractor =  (req:CustomRequest,_res:Response, next:NextFunction) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer')){
        req.token = authorization.replace('Bearer ','')
    }else{
        req.token = null
    }
    return next()
}

const userExtractor = async (req:CustomRequest,res:Response,next:NextFunction) =>{
    try{
        if(req.token){
            const decodedToken = verify(req.token, SECRET as Secret) 
            req.user = await User.findById(decodedToken)
        }
        return next()
    }catch(error){
        return res.status(401).json({error:'token invalid'})
    }
}

export {tokenExtractor,userExtractor}