import Cart from "../models/shopping-cart-model"
import User from "../models/user-model"
import Product from "../models/product-model"


const createUser = async (email:string,name:string,passwordHash:string) => {

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
    
    return newUser

}

const deleteUserDB = async (id:string) => {

    const products = await Product.find({'reviews.postedBy':id})
    for(const product of products){
        if(product.reviews){
        const index = product.reviews.findIndex(review => review.postedBy.toString() === id)
        product.reviews.splice(index,1)
        }
    }
    await User.findByIdAndRemove(id)
}

export {createUser,deleteUserDB}