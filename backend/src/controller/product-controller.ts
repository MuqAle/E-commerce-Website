import Product from "../models/product-model"
import Cart from "../models/shopping-cart-model"
import User from "../models/user-model"
import Session from "../models/session-model"
import {ProductDb} from "../types/type"
import { Request,Response,NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import evenRound from "../utils/rounding"
import { uploadImage,deleteImage,updateImages} from "../utils/cloudinary"
import {v4 as uuidv4} from 'uuid'







const getAllProducts = async (_req:Request,res:Response)=> {
    const product:ProductDb[] = await Product.find({}).populate('reviews.postedBy',
    {name:1})

    
    
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



const addProduct = async (req:Request<ParamsDictionary, unknown, ProductDb>,res:Response,next:NextFunction) => {
    try{
        const {body} = req
        const files = req.files as Express.Multer.File[]
        const uuid = uuidv4()

        const imagePath = await uploadImage(files,uuid)

        console.log(imagePath)

        const newProduct = new Product({
            name:body.name,
            type:body.type,
            price:body.price,
            onSale:body.onSale,
            salePercentage:body.salePercentage,
            salePrice:evenRound(body.price * (body.salePercentage as number),2),
            description:body.description,
            stock:body.stock,
            metal:body.metal,
            colors:body.colors,
            images: imagePath,
            imageFolder: uuid
        })
        
        const saveProduct = await newProduct.save() 
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

        const sessions = await Session.find({'session.guestCart.products.product':id})


        for(const session of sessions){
            const sessionCart = session.session.guestCart 
            const productRemove = sessionCart.products.find(product => product.product.toString() === id) 

            if(productRemove && product){
                const quantityRemove = productRemove.quantity

                const totalPrice = evenRound(quantityRemove * (product.onSale ?
                    product.salePrice as number :
                    product.price ), 2
                    )
                sessionCart.cartTotal -= quantityRemove
                sessionCart.cartPrice -= totalPrice
                sessionCart.cartPrice = evenRound(sessionCart.cartPrice,2)

                sessionCart.products = sessionCart.products.filter(product => product.product.toString() !== id)


                await session.save()
            }
        }


        const carts = await Cart.find({'products.product':id})

        for(const cart of carts){
            const productRemove = cart.products.find(product => product.product.toString() === id)

            if(productRemove && product){
                const quantityRemove = productRemove.quantity

                const totalPrice = evenRound(quantityRemove * (product.onSale ?
                    product.salePrice as number :
                    product.price ), 2
                    )
                cart.cartTotal -= quantityRemove
                cart.cartPrice -= totalPrice
                cart.cartPrice = evenRound(cart.cartPrice,2)

                cart.products = cart.products.filter(product => product.product.toString() !== id)

                await cart.save()
            }
        }

        const users = await User.find({'reviews.product':id})

        for(const user of users){
            user.reviews = user.reviews?.filter(review => review.product.toString() !== id)
        }

        await deleteImage(fullFolderPath)

        await Product.findByIdAndRemove(req.params.id)


        res.status(204).end()
    }catch(error){
        next(error)
    }
}

const updatedProducts = async (req:Request<ParamsDictionary, unknown, ProductDb>,res:Response,next:NextFunction) => {
    try{
        const {body,params} = req
        const files = req.files as Express.Multer.File[]
        let images

        if(files){
            const product = await Product.findById(req.params.id)
            const folderPath = `${product?.imageFolder}`
            const fullFilePath = `online-store/${product?.imageFolder}/`

           images = await updateImages(folderPath,fullFilePath,files)
        }

        const product = {
            name:body.name,
            price:body.price,
            onSale:body.onSale,
            salePercentage:body.salePercentage,
            description:body.description,
            stock:body.stock,
            sold:body.sold,
            metal:body.metal,
            colors:body.colors,
            images:images
        }

        const changeProduct = await Product.findByIdAndUpdate(params.id,product,
            {new:true,
            runValidators:true,
            context:'query'})

        res.json(changeProduct)
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