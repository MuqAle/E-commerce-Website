import Product from "../models/product-model"
import { ProductDb} from "../types/type"
import { Request,Response,NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core"



const getAllProducts = async (_req:Request,res:Response)=> {
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
        
        next(error)
        
    }
}

const deleteProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        await Product.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }catch(error){
        next(error)
    }
}



const addProduct = async (req:Request<ParamsDictionary, unknown, ProductDb>,res:Response,next:NextFunction) => {
    try{
        const {body} = req
        const files = req.files as Express.Multer.File[]
        const imagePath = files.map(files => files.path)
        const newProduct = new Product({
            name:body.name,
            idProduct:body.idProduct,
            type:body.type,
            price:body.price,
            onSale:body.onSale,
            salePercentage:body.salePercentage,
            description:body.description,
            images: imagePath
        })


        const saveProduct = await newProduct.save()
        res.status(201).json(saveProduct)
    }catch(error){
        next(error)
    }
}



export {
    getAllProducts,
    getProduct,
    deleteProduct,
    addProduct
}