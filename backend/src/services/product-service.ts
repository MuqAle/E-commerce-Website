import Session from "../models/session-model"
import Cart from "../models/shopping-cart-model"
import User from "../models/user-model"
import Product from "../models/product-model"
import { ProductDb } from "../types/type"
import evenRound from "../utils/rounding"
import {v4 as uuidv4} from 'uuid'
import { uploadImage,updateImages } from "../utils/cloudinary"



const addProductDB = async(body:ProductDb,files:Express.Multer.File[]) => {

    const uuid = uuidv4()
    const imagePath = await uploadImage(files,uuid)

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
    return saveProduct
}

const deleteProductSession = async (product:ProductDb,id:string) => {
    
    const sessions = await Session.find({'session.guestCart.products.product':id})

    for(const session of sessions){
        const sessionCart = session.session.guestCart 
        const productRemove = sessionCart.products.find(product => product.product.toString() === id) 

        if(productRemove){
            const quantityRemove = productRemove.quantity
            const totalPrice = evenRound(quantityRemove * (product.onSale ?
                product.salePrice as number :
                product.price ), 2
                )
            sessionCart.cartTotal -= quantityRemove
            sessionCart.cartPrice -= totalPrice
            sessionCart.cartPrice = evenRound(sessionCart.cartPrice,2)

            const index = sessionCart.products.findIndex(product => product.product.toString() === id)
            sessionCart.products.splice(index,1)

            await session.save()
        }
    }
}

const deleteProductUser = async (product:ProductDb,id:string) => {

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

                const index = cart.products.findIndex(product => product.product.toString() === id)
                cart.products.splice(index,1)

                await cart.save()
            }
        }
}

const deleteProductReviews = async (id:string) => {

    const users = await User.find({'reviews.product':id})
    for(const user of users){
        if(user.reviews){
        const index = user.reviews.findIndex(review => review.product.toString() === id)
        user.reviews.splice(index,1)
        }
    }
}


const updateProductDB = async(body:ProductDb,id:string,files:Express.Multer.File[]) => {

    let images

        if(files){
            const product = await Product.findById(id)
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

        const changeProduct = await Product.findByIdAndUpdate(id,product,
            {new:true,
            runValidators:true,
            context:'query'})
        
        return changeProduct
}

export {
    addProductDB,
    deleteProductSession,
    deleteProductUser,
    deleteProductReviews,
    updateProductDB}