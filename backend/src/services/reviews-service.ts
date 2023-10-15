import Product from "../models/product-model";
import User from "../models/user-model";
import { ProductDb, UserTypes } from "../types/type";
import evenRound from "../utils/rounding";
import { Types } from "mongoose";


const updatedRating = async (id:string) => {
    const getAllReviews = await Product.findById(id)
        const totalReviews = getAllReviews?.reviews?.length
        let actualRating
        const reviewSum = getAllReviews?.reviews?.map((product) => product.rating)
        .reduce((prev,curr) => prev + curr, 0)
        if(reviewSum && totalReviews){
            if(totalReviews === 0){
                actualRating = 0
            }else{
                actualRating = evenRound((reviewSum/totalReviews),2)
                getAllReviews.overallRating = actualRating
            }
             
        }
        const product = await getAllReviews?.save()

        return product
}

const updateProductRating = async (alreadyRated:ProductDb['reviews'][0],rating:number,reviewDesc:string,id:string) => {
    await Product.updateOne(
        {
        reviews:{
            $elemMatch:alreadyRated
        },
        },{
        $set:{
            "reviews.$.rating":rating,
            "reviews.$.reviewDesc":reviewDesc}
        },{
            new:true,
            context:"query"
        }
    )
    await User.updateOne(
        {
            reviews:{
                $elemMatch:{
                    product:id
                }
            }
        },{
            $set:{
                "reviews.$.rating":rating,
                "reviews.$.reviewDesc":reviewDesc
            }
        }
    )
}

const addNewRating = async (id:string,user:UserTypes,rating:number,reviewDesc:string) => {
    await Product.findByIdAndUpdate(id,{
        $push: {
            reviews:{
                postedBy:user.id,
                rating:rating,
                reviewDesc:reviewDesc, 
            }
        },
        new:true,
        context:'query'
    })
    if(user.reviews){
        user.reviews.push({
            product:new Types.ObjectId(id),
            reviewDesc:reviewDesc,
            rating:rating,})
        await user.save()
    }
}

const deleteProductReview = async (product:ProductDb,reviewPosted:ProductDb['reviews'][0],user:UserTypes,id:string) => {
    const productIndex = product.reviews.findIndex(review => review.postedBy === reviewPosted.postedBy)
    product.reviews = product.reviews.splice(productIndex,1)
    if(user.reviews){
        const userIndex = user.reviews.findIndex(review => review.product.toString() === id)
        user.reviews = user.reviews.splice(userIndex,1) 
    }
    await user.save()
    await product.save()
}

export {updateProductRating,updatedRating,addNewRating,deleteProductReview}