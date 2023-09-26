import Cart from "../models/shopping-cart-model"
import User from "../models/user-model"
import Product from "../models/product-model"
import { Types } from "mongoose"
import evenRound from "../utils/rounding"




const createUser = async (email:string,firstName:string,lastName:string,passwordHash:string,isAdmin:boolean) => {

    const user = new User({
        email,
        firstName,
        lastName,
        passwordHash,
        shoppingCart: null,
        isAdmin
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
    
    return newUser

}

const deleteUserDB = async (userId:Types.ObjectId,cartId:Types.ObjectId) => {

    const products = await Product.find({'reviews.postedBy':userId})
    await Cart.findOneAndRemove(cartId)
    for(const product of products){
        if(product.reviews){
        const index = product.reviews.findIndex(review => review.postedBy.toString() === userId.toString())
        product.reviews.splice(index,1)
        const updatedProduct = await product.save()
        const totalReviews = updatedProduct.reviews.length
        const reviewSum = updatedProduct.reviews.map((product) => product.rating)
        .reduce((prev,curr) => prev + curr, 0)
        if(totalReviews === 0){
            updatedProduct.overallRating = 0
        }else{
            const actualRating = evenRound((reviewSum/totalReviews),2)
            updatedProduct.overallRating = actualRating
        }
        
        await updatedProduct.save()
        }
    }
    await User.findByIdAndRemove(userId)
}


export {createUser,deleteUserDB}