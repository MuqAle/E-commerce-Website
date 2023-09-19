import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret, verify} from 'jsonwebtoken'
import User from "../models/user-model";
import {SECRET} from "../config/config";
import { UserTypes } from "../types/type";


const tokenExtractor =  (req:Request,_res:Response, next:NextFunction) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer')){
        req.token = authorization.replace('Bearer ','')
    }else{
        req.token = null
    }
    return next()
}

const userExtractor = async (req:Request,res:Response,next:NextFunction) => {
    try{
        if(req.token){
            const decodedToken = verify(req.token, SECRET as Secret) as JwtPayload
            req.user = await User.findById(decodedToken.id) as UserTypes
        }
        return next()
    }catch(error){
        return res.status(401).json({error:'token invalid'})
    }
}

const isAdmin = (req:Request,res:Response) => {
    if(req.user && req.user.isAdmin === false){
        res.status(400).send('Access Denied: Not Admin')
    }else{

        res.status(400).send('Access Denied: You Must Login')
        
    }
    
}

export {tokenExtractor,userExtractor,isAdmin}