import Product from "../models/product-model";
import User from "../models/user-model";
import { ProductDb, UserTypes } from "../types/type";
import evenRound from "../utils/rounding";
import { Types } from "mongoose";


const updatedRating = async (id:string) => {
    const getAllReviews = await Product.findById(id).populate('reviews.postedBy',{firstName:1,lastName:1})
        const totalReviews = getAllReviews?.reviews.length
        let actualRating = 0
        if(totalReviews && totalReviews > 0){
            const reviewSum = getAllReviews?.reviews.map((product) => product.rating)
            .reduce((prev,curr) => prev + curr, 0)
            if(reviewSum && totalReviews){
            actualRating = evenRound((reviewSum/totalReviews),2) 
        }
        }
        if(getAllReviews && getAllReviews.overallRating){
            getAllReviews.overallRating = actualRating
        }
        
        const product = await getAllReviews?.save()

        return product
}

const updateProductRating = async (alreadyRated:ProductDb['reviews'][0],rating:number,reviewTitle:string,reviewDesc:string,id:string) => {
    await Product.updateOne(
        {
        reviews:{
            $elemMatch:alreadyRated
        },
        },{
        $set:{
            "reviews.$.rating":rating,
            "reviews.$.reviewDesc":reviewDesc,
            "reviews.$.reviewTitle":reviewTitle}
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
                "reviews.$.reviewDesc":reviewDesc,
                "reviews.$.reviewTitle":reviewTitle
            }
        },{
            new:true,
            runValidators:true,
            context:"query"
        }
    )
}

const addNewRating = async (id:string,user:UserTypes,rating:number,reviewTitle:string,reviewDesc:string) => {
    await Product.findByIdAndUpdate(id,{
        $push: {
            reviews:{
                postedBy:user.id,
                rating:rating,
                reviewDesc:reviewDesc, 
                reviewTitle:reviewTitle,
            }
        },
        new:true,
        runValidators:true,
        context:'query'
    })
    if(user.reviews){
        user.reviews.push({
            product:new Types.ObjectId(id),
            reviewDesc:reviewDesc,
            reviewTitle:reviewTitle,
            rating:rating,})
        await user.save()
    }
}

const deleteProductReview = async (product:ProductDb,reviewPosted:ProductDb['reviews'][0],user:UserTypes,id:string) => {
    const productIndex = product.reviews.findIndex(review => review.postedBy === reviewPosted.postedBy)
    product.reviews.splice(productIndex,1)
    if(user.reviews){
        const userIndex = user.reviews.findIndex(review => review.product.toString() === id)
        user.reviews.splice(userIndex,1) 
    }
    await user.save()
    await product.save()
}

export {updateProductRating,updatedRating,addNewRating,deleteProductReview}