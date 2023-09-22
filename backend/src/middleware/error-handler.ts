import { NextFunction, Request, Response } from "express"
import { Error } from "mongoose"


const errorHandler = (error:Error,_req:Request,res:Response,next:NextFunction) => {
    if(error.name === 'ValidationError'){
        return res.status(400).json({Error:error.message})
    }
    if(error.name === 'JsonWebTokenError'){
        return res.status(400).json({Error:error.message})
    }
    return next(error)
}

export default errorHandler