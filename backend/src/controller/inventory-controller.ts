import Product from "../models/inventory"
import { ProductDb } from "../types/type"
import { Request,Response,NextFunction } from "express"

const getInventory = async (_req:Request,res:Response) => {
    const product:ProductDb[] = await Product.find({})
    res.json(product)
}

const getProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).end()
        }
    }catch(error){
        if(error instanceof Error){
            next(error)
        }
        
    }
}

export {
    getInventory,
    getProduct
}