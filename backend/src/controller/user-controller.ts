import {hash} from 'bcrypt'
import User from '../models/user-model'
import { Request,Response} from 'express'
import { ParamsDictionary } from "express-serve-static-core"
import { UserTypes } from '../types/type'

const addUser = async (req:Request<ParamsDictionary, unknown, UserTypes>,res:Response) => {
    const {emailAddress,name,password} = req.body
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)

    if(!password){
        return res.status(400).json({
            error:'Content missing'
        })
    }
    if(password.length <= 3){
        return res.status(400).json({
            error:'password too short'
        })
    }
    if(!regexp.test(password)){
        return res.status(400).json({
            error:'Password must have include a capital letter,a number, and a special character'
        })
    }

    const saltRounds = 10
    const passwordHash = await hash(password,saltRounds)

    const user = new User({
        emailAddress,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    return res.status(201).json(savedUser)
}

const getUsers = async(_req:Request,res:Response) => {
    const users = await User.find({}).populate('')
    res.json(users)
}

export {
    addUser,
    getUsers
}