import { Types } from "mongoose"
import Cart from "../models/shopping-cart-model"
import { CartTypes, ProductDb, UserTypes } from "../types/type"
import evenRound from "../utils/rounding"
import Product from "../models/product-model"

interface CartType {
    product:{
        _id:Types.ObjectId,
        price:number
        name:string
        onSale:boolean,
        salePercentage:number
        salePrice:number
    }
    quantity:number,
    _id:Types.ObjectId
}


const addToCartUser = async (user:UserTypes,productId:string,cartItems:CartTypes['products'][0],product:ProductDb) => {
        const cart = await Cart.findById(user.shoppingCart).
            populate('products.product',{price:1,name:1,onSale:1,salePercentage:1,salePrice:1}) 
        const foundObject = cart?.products.
            find(product => productId === product.product.id.toString()) as CartType | undefined
        let updatedCart
        if(!foundObject){
                updatedCart =  await Cart.findByIdAndUpdate(cart?._id,
                 {
                 $push:{products:cartItems},
                 $inc:{cartTotal:cartItems.quantity, cartPrice: product.onSale ?
                       product.salePrice
                      :
                      product.price },
                 },
                 { 
                 new:true
                 }).populate('products.product',{price:1,name:1,onSale:1,salePercentage:1,salePrice:1})
         }else{
             foundObject.quantity += 1
            if(cart && foundObject){
             cart.cartPrice += foundObject.product.onSale ? 
             foundObject.product.salePrice
             : 
             foundObject.product.price
             cart.cartPrice = evenRound(cart.cartPrice,2) 
             cart.cartTotal += 1        
             updatedCart = await cart.save()   
            }
         }
         return updatedCart
}



const addToCartGuest = (guestCart:CartTypes,cartItems:CartTypes['products'][0],productId:string,product:ProductDb) => {
    const foundObject = guestCart?.products?.
        find(product => productId === product.product.toString())

    if(!guestCart){
        guestCart = {
            products:[] as unknown as CartTypes['products'],
            cartPrice:0,
            cartTotal:0
        } 
        
    }if(foundObject && guestCart){
        foundObject.quantity += 1
        guestCart.cartPrice += product.onSale ?
        product.salePrice as number
        :
        product.price
        guestCart.cartTotal += 1
        guestCart.cartPrice = evenRound(guestCart.cartPrice,2)
    }else{
        guestCart.products.push(cartItems)
        guestCart.cartPrice += product.onSale ?
        product.salePrice as number
        :
        product.price
        guestCart.cartTotal += 1
    }

    guestCart.cartPrice = evenRound(guestCart.cartPrice,2)
    return guestCart
}


const deleteFromCartUser = async (user:UserTypes,productId:string,) => {
    const userShopping = user.shoppingCart
    const cart = await Cart.findById(userShopping).populate('products.product',
        {price:1,name:1,onSale:1,salePercentage:1,salePrice:1}) 
    const foundObject = cart?.products.
        find(product => productId === product.product.id.toString()) as CartType | undefined
    
    if(!foundObject){
       return ({
        status:404,
        response:{Error: 'Item Not Found'}
       })
    }
    if(cart && cart?.products.length < 1){
        return ({
            status:400,
            response:{Error: 'No Items In Cart'}
           })
    }else{
        if(foundObject){
            const updatedCart = await Cart.findByIdAndUpdate(cart?._id,
                {
                $pull:{products:{product:productId}},
                $inc:{cartTotal: -foundObject?.quantity, cartPrice: evenRound(
                    foundObject.product.onSale ?
                     evenRound(-(foundObject.product.salePrice * foundObject.quantity),2)
                    :
                    evenRound(-(foundObject.product.price * foundObject.quantity),2),2
                ) 
                     }
                },
                { 
                new:true
                })
                return ({
                    status:200,
                    response:updatedCart
                   })
        }
        return
    }
}

const deleteFromCartGuest = async(guestCart:CartTypes,productId:string) => {
    
            const foundProduct = guestCart.products.find(product => productId === product.product.toString())
            const product = await Product.findById(foundProduct?.product)
            if(guestCart.products.length <= 0){
                return ({
                    status:400,
                    response:{Error: 'No Items In Cart'}
                })
            }
            if(foundProduct && product){
                const index = guestCart.products.findIndex(product => product.product.toString() === productId)
                guestCart.products.splice(index,1)
                guestCart.cartPrice -= product?.onSale ? 
                evenRound((product.salePrice as number) * foundProduct.quantity,2) :
                evenRound(product.price * foundProduct.quantity,2)
                guestCart.cartPrice = evenRound(guestCart.cartPrice,2)
                guestCart.cartTotal -= foundProduct.quantity
                return ({
                    status:200,
                    response:guestCart})
            }else{
                return ({
                    status:400,
                    response:{Error: 'Item Not Found'}
                   })
            }
            
}


const reduceFromCartUser = async (user:UserTypes,productId:string) => {

    const cart = await Cart.findById(user.shoppingCart).populate('products.product',{price:1,name:1,onSale:1,salePercentage:1,salePrice:1}) 
    const foundObject = cart?.products.find(product => productId === product.product.id.toString()) as CartType | undefined
    let response 
    if(!foundObject){
        response = ({
            status:404,
            response:{Error:'Item Not Found'}
        })
    }
    if(foundObject && cart){
        if(cart.products.length < 1){
        response =  ({
                status:400,
                response:{Error:'Cart Is Empty'}
            })
        }
        if(foundObject.quantity > 1){
            foundObject.quantity -= 1
        }else{
            const index = cart.products.findIndex(product => product.product.toString() === productId)
            cart.products.splice(index,1)
        }
        cart.cartTotal -= 1
        cart.cartPrice -= foundObject.product.onSale ? 
        foundObject.product.salePrice
        : 
        foundObject.product.price 
        cart.cartPrice = evenRound(cart.cartPrice,2)
        const savedCart = await cart.save()
        response = ({
            status:200,
            response:savedCart
        })
    }
    return (response)
}

const reduceFromCartGuest = async (guestCart:CartTypes,productId:string) => {

            const foundProduct = guestCart.products.find(product => productId === product.product.toString())
            const product = await Product.findById(foundProduct?.product) as ProductDb
            const foundIndex = guestCart.products.findIndex(product => productId === product.product.toString())
            if(!foundProduct){
                return ({
                    status:404,
                    response:{Error:'Item Not Found'}
                })
            }else{
                if(foundProduct.quantity > 1){
                    foundProduct.quantity -= 1
                }else{
                    guestCart.products.splice(foundIndex,1)
                }
                guestCart.cartPrice -= product.onSale ? 
                product.salePrice as number
                :
                product.price
                guestCart.cartTotal -= 1
                guestCart.cartPrice = evenRound(guestCart.cartPrice,2)
                return ({
                    status:200,
                    response:guestCart
                })
            }
            
}


export {
    addToCartUser,
    addToCartGuest,
    deleteFromCartUser,
    deleteFromCartGuest,
    reduceFromCartGuest,
    reduceFromCartUser

}