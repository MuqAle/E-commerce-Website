import {hash} from 'bcrypt'
import User from '../models/user-model'
import { createUser, deleteUserDB } from '../services/user-service'
import {Request,Response} from 'express'
import { ParamsDictionary } from "express-serve-static-core"
import { UserRequest} from '../types/type'

const addUser = async (req:Request<ParamsDictionary, unknown, UserRequest>,res:Response) => {
    const {email,name,password} = req.body
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)

    try{
        if(!password){
            return res.status(400).json({
                Error:'Content missing'
            })
        }
        if(password.length <= 3){
            return res.status(400).json({
                Error:'password too short'
            })
        }
        if(!regexp.test(password)){
            return res.status(400).json({
                Error:'Password must include a capital letter,a number, and a special character'
            })
        }
        
        const saltRounds = 10
        const passwordHash = await hash(password,saltRounds)

        const user = createUser(email,name,passwordHash)

        return res.status(201).json(user)

    }catch(error){
        return res.status(500).json({ Error: 'An error occurred' });
    }
   
}

const getUsers = async(_req:Request,res:Response) => {
    const users = await User.find({}).populate('reviews.product',{
        name:1,type:1,overallRating:1
    })
    res.json(users)
}

const deleteUser = async(req:Request,res:Response) => {
    const id = req.params.id
    try{
        await deleteUserDB(id)
        res.status(204).end()
    }catch(error){
        res.status(404).json({Error:'User Not Found'})
    }
}





export {
    addUser,
    getUsers,
    deleteUser,
}