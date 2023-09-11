import {hash} from 'bcrypt'
import User from '../models/user-model'
import Cart from '../models/shopping-cart-model'
import { NextFunction, Request,Response} from 'express'
import { ParamsDictionary } from "express-serve-static-core"
import { UserRequest} from '../types/type'

const addUser = async (req:Request<ParamsDictionary, unknown, UserRequest>,res:Response) => {
    const {email,name,password} = req.body
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)

    try{
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
                error:'Password must include a capital letter,a number, and a special character'
            })
        }
        
        const saltRounds = 10
        const passwordHash = await hash(password,saltRounds)

        

    
        const user = new User({
            email,
            name,
            passwordHash,
            shoppingCart: null
        })
    
        const savedUser = await user.save() 


        const cart = new Cart({
            products:[],
            cartTotal:0,
            cartPrice:0,
            user:savedUser
        })

        const savedCart = await cart.save()

        const newUser = await User.findByIdAndUpdate(savedUser, 
            { shoppingCart: savedCart },
            {new:true})


        return res.status(201).json(newUser)

    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'An error occurred' });
    }
   
}

const getUsers = async(_req:Request,res:Response) => {
    const users = await User.find({}).populate('reviews.product',{
        name:1,type:1,overallRating:1
    })
    res.json(users)
}

const deleteUser = async(req:Request,res:Response,next:NextFunction) => {
    try{
        await User.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }catch(error){
        next(error)
    }
}





export {
    addUser,
    getUsers,
    deleteUser,
}