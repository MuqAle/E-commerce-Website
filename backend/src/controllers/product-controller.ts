import Product from "../models/product-model"
import {ProductDb} from "../types/type"
import { Request,Response,NextFunction } from "express"
import {deleteImage} from "../utils/cloudinary"
import { addProductDB, deleteProductReviews, deleteProductSession, deleteProductUser, updateProductDB } from "../services/product-service"




const getAllProducts = async (_req:Request,res:Response,next:NextFunction)=> {
    try{
        const product:ProductDb[] = await Product.find({})
          res.status(200).json(product)
    }catch(error){
        next(error)
    } 
}

const getProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const product = await Product.findById(req.params.id).populate('reviews.postedBy',{firstName:1,lastName:1})
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).end()
        }
    }catch(error){
        next(error)
    }
}



const addProduct = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const body = req.body as ProductDb
        const files = req.files as Express.Multer.File[]

        const saveProduct = await addProductDB(body,files)

        res.status(201).json(saveProduct)
    }catch(error){
        next(error)
    }
}


const deleteProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        const fullFolderPath = `online-store/${product?.imageFolder}/`

        if(product){
            await deleteProductSession(product,id)
            await deleteProductReviews(id)
            await deleteProductUser(product,id)
            await deleteImage(fullFolderPath)

            await Product.findByIdAndRemove(req.params.id)

            res.status(204).end()
        }else{
            res.status(404).json({Error:'Item Not Found'})
        }

    }catch(error){
        next(error)
    }
}

const updatedProducts = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const body = req.body as ProductDb
        const files = req.files as Express.Multer.File[]

        const changeProduct = await updateProductDB(body,id,files)

        if(!changeProduct){
            res.status(404).json({Error:'Item Not Found'})
        }else{
            res.json(changeProduct)
        }
        
    }catch(error){
        next(error)
    }
   

}


export {
    getAllProducts,
    getProduct,
    deleteProduct,
    addProduct,
    updatedProducts
}