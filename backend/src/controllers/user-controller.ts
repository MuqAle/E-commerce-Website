import {hash} from 'bcrypt'
import User from '../models/user-model'
import { createUser, deleteUserDB } from '../services/user-service'
import {NextFunction, Request,Response} from 'express'
import { ParamsDictionary } from "express-serve-static-core"
import { UserRequest} from '../types/type'

const addUser = async (req:Request<ParamsDictionary, unknown, UserRequest>,res:Response,next:NextFunction) => {
    const {email,firstName,lastName,password,isAdmin} = req.body
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)

    try{
        if(!password){
            return res.status(400).json({
                Error:'Content Missing'
            })
        }
        if(password.length <= 3){
            return res.status(400).json({
                Error:'Password Too short'
            })
        }
        if(!regexp.test(password)){
            return res.status(400).json({
                Error:'Password Must Include a Capital Letter, a Number, And a Special Character'
            })
        }
        
        const saltRounds = 10
        const passwordHash = await hash(password,saltRounds)

        const user = await createUser(email,firstName,lastName,passwordHash,isAdmin)


        return res.status(201).json(user)

    }catch(error){
        return next(error);
    }
   
}

const getUsers = async(_req:Request,res:Response) => {
    const users = await User.find({}).populate('reviews.product',{
        name:1,type:1,overallRating:1
    })
    res.json(users)
}

const deleteUser = async(req:Request,res:Response) => {
    const userId = req.user.id
    const cartId = req.user.shoppingCart
    try{
        await deleteUserDB(userId,cartId)
        res.status(204).end()
    }catch(error){
        res.status(404).json({Error:'User Not Found'})
    }
}

const getUserProfile = (req:Request,res:Response) => {
    if(req.user){
        res.status(201).json(req.user)
    }else{
        res.status(401).json({Error:'User Not Logged In'})
    }
}




export {
    addUser,
    getUsers,
    deleteUser,
    getUserProfile
}