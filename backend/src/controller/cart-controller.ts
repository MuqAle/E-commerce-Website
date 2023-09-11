/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose"
import User from "../models/user-model"
import Cart from "../models/shopping-cart-model"
import { NextFunction, Request, Response } from "express"
import { CartSessionTypes, CartUserType, ProductDb} from "../types/type"
import Product from "../models/product-model"
import evenRound from "../utils/rounding"


interface CartType {
    product:{
        _id:mongoose.Types.ObjectId,
        price:number
        name:string
        onSale:boolean,
        salePercentage:number
    }
    quantity:number,
    _id:mongoose.Types.ObjectId
}

const getAllCart = async(_req:Request,res:Response,) => {
    const cart:CartUserType[] = await Cart.find({}).populate('products.product', {name:1,price:1})
    
     res.json(cart)
}


const addToCart = async (req:Request,res:Response,next:NextFunction) => {
    const productId = req.params.id
    

    const cartItems = {
        product:new mongoose.Types.ObjectId(productId),
        quantity:1
    }
    const product = await Product.findById(productId) as ProductDb
    const salePrice = evenRound(product.salePercentage * product.price,2)
    try{
        
        if(req.user){
            const userId = req.user.id 
            const user = await User.findById(userId)
            const cart = await Cart.findById(user?.shoppingCart).populate('products.product',{price:1,name:1,onSale:1,salePercentage:1}) 
            const foundObject = cart?.products.find(product => productId === product.product.id.toString()) as CartType | undefined
            
            if(!foundObject){
               const updatedCart =  await Cart.findByIdAndUpdate(cart?._id,
                    {
                    $push:{products:cartItems},
                    $inc:{cartTotal:cartItems.quantity, cartPrice: product.onSale ?
                          salePrice
                         :
                         product.price },
                    },
                    { 
                    new:true
                    }).populate('products.product',{price:1,name:1,onSale:1,salePercentage:1})

                    res.json(updatedCart)
            }else{
               foundObject.quantity += 1
               if(cart && foundObject){
                cart.cartPrice += foundObject.product.onSale ? 
                salePrice
                : 
                foundObject.product.price
                cart.cartPrice = evenRound(cart.cartPrice,2) 
                cart.cartTotal += 1        
                const savedCart = await cart?.save()
                res.json(savedCart)    
               }
            }
            
        }
        else{
            
            let guestCart = req.session.guestCart as CartSessionTypes
            const foundObject = guestCart?.products?.find(product => productId === product.product.toString())

            if(!guestCart){
                guestCart = {
                    products:[] as unknown as CartSessionTypes['products'],
                    cartPrice:0,
                    cartTotal:0
                } 
                
            }if(foundObject && guestCart){
                foundObject.quantity += 1
                guestCart.cartPrice += product.onSale ?
                salePrice
                :
                product.price
                guestCart.cartTotal += 1
                guestCart.cartPrice = evenRound(guestCart.cartPrice,2)
            }else{
                guestCart.products.push(cartItems)
                guestCart.cartPrice += product.onSale ?
                salePrice
                :
                product.price
                guestCart.cartTotal = 1
            }

            guestCart.cartPrice = evenRound(guestCart.cartPrice,2)

            req.session.guestCart = guestCart
   
            res.send(guestCart)
        }
        
    }catch(error){
        next(error)
        console.log(error)
    }
   
}

const deleteFromCart = async (req:Request,res:Response,next:NextFunction) => {

    const productId = req.params.id


    try{
        if(req.user){
            const userId = req.user.id 
            const user = await User.findById(userId)
            const cart = await Cart.findById(user?.shoppingCart).populate('products.product',{price:1,name:1,onSale:1,salePercentage:1}) 
            const foundObject = cart?.products.find(product => productId === product.product.id.toString()) as CartType | undefined
            
            if(foundObject){

                const salePrice = evenRound(foundObject.product.salePercentage * foundObject.product.price,2)

                const updatedCart = await Cart.findByIdAndUpdate(cart?._id,
                    {
                    $pull:{products:{product:productId}},
                    $inc:{cartTotal: -foundObject.quantity, cartPrice:  
                        foundObject.product.onSale ?
                         evenRound(-(salePrice * foundObject.quantity),2)
                        :
                        evenRound(-(foundObject.product.price * foundObject.quantity),2) }
                    },
                    { 
                    new:true
                    })
                    res.json(updatedCart)
            }
            if(cart && cart?.products.length < 1){
                next()
            }
            
        }else{
            const anonCart =  req.session.guestCart as CartSessionTypes
            const foundIndex = anonCart.products.findIndex(product => productId === product.product.toString())
            const foundProduct = anonCart.products.find(product => productId === product.product.toString())
            const product = await Product.findById(foundProduct?.product)
            if(foundProduct && product){
                const salePrice = evenRound(product?.price  * product.salePercentage ,2)
                anonCart.products.splice(foundIndex,1)
                anonCart.cartPrice -= product?.onSale ? 
                evenRound(salePrice * foundProduct.quantity,2) :
                evenRound(product.price * foundProduct.quantity,2)
                anonCart.cartTotal -= foundProduct.quantity
                
            }
  
            res.json(anonCart)
        }

    }catch(error){
        next()
        console.log(error)
    }
}




const reductionCart = async (req:Request,res:Response,next:NextFunction) => {

    const productId = req.params.id

    try{
        if(req.user){
            const userId = req.user.id 
            const user = await User.findById(userId)
            const cart = await Cart.findById(user?.shoppingCart).populate('products.product',{price:1,name:1,onSale:1,salePercentage:1}) 
            const foundObject = cart?.products.find(product => productId === product.product.id.toString()) as CartType | undefined
            
            if(foundObject && foundObject.quantity > 1){
                foundObject.quantity -= 1
            }else{
                await Cart.findByIdAndUpdate(cart?._id,
                    {
                    $pull:{products:{product:productId}},
                    },
                    { 
                    new:true
                    })

            }
            if(cart && foundObject){
                const salePrice = evenRound(foundObject.product.salePercentage * foundObject.product.price,2)

                cart.cartTotal -= 1
                cart.cartPrice -= foundObject.product.onSale ? 
                salePrice
                : 
                foundObject.product.price 
                cart.cartPrice = evenRound(cart.cartPrice,2)
                await cart.save()
            }
            if(cart && cart.products.length < 1){
                next()
            }
            res.json(await Cart.findById(user?.shoppingCart))
        }else{

            const anonCart =  req.session.guestCart as CartSessionTypes
            const foundProduct = anonCart.products.find(product => productId === product.product.toString())
            const product = await Product.findById(foundProduct?.product) as ProductDb
            const foundIndex = anonCart.products.findIndex(product => productId === product.product.toString())
            if(foundProduct && foundProduct.quantity > 1){
                foundProduct.quantity -= 1
            }else{
                anonCart.products.splice(foundIndex,1)
            }
            anonCart.cartPrice -= product.onSale ? 
            evenRound(product.price * product.salePercentage,2) 
            :
            product.price
            anonCart.cartTotal -= 1
            anonCart.cartPrice = evenRound(anonCart.cartPrice,2)
            res.json(anonCart)
        }
    }catch(error){
        next()
        console.log(error)
    }
}



export {addToCart,
    deleteFromCart,
    reductionCart,
    getAllCart}

