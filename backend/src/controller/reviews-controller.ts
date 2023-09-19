import { NextFunction, Request, Response } from "express";
import Product from "../models/product-model";
import { ParamsDictionary } from "express-serve-static-core"
import { ReviewTypes } from "../types/type";
import mongoose from "mongoose";
import User from "../models/user-model";
import evenRound from "../utils/rounding";



const updatedRating = async (id:string) => {

    const getAllReviews = await Product.findById(id)
        const totalReviews = getAllReviews?.reviews?.length
        let actualRating
        const reviewSum = getAllReviews?.reviews?.map((product) => product.rating)
        .reduce((prev,curr) => prev + curr, 0)
        if(reviewSum && totalReviews){
             actualRating = evenRound((reviewSum/totalReviews),3)
             getAllReviews.overallRating = actualRating
        }
        const product = await getAllReviews?.save()

        return product
}


const postReview = async (req:Request<ParamsDictionary, unknown, ReviewTypes>,res:Response,next:NextFunction) => {
    try{
        const {user} = req
        const {rating,reviewDesc} = req.body 

        const product = await Product.findById(req.params.id)

        const alreadyRated = product?.reviews?.find(
            userId => userId.postedBy.toString() === user.id.toString()
        )
        if(alreadyRated){
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
                            product:req.params.id
                        }
                    }
                },{
                    $set:{
                        "reviews.$.rating":rating,
                        "reviews.$.reviewDesc":reviewDesc
                    }
                }
            )
        }else{
           await Product.findByIdAndUpdate(req.params.id,{
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
            user.reviews = user.reviews?.concat({
                product:new mongoose.Types.ObjectId(req.params.id),
                reviewDesc:reviewDesc,
                rating:rating,})
            await user.save()
        }
        const finalProduct = await updatedRating(req.params.id)

        res.json(finalProduct)

    }catch(error){
        next(error)
    }
}

const deleteReview = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {user} = req

        const product = await Product.findById(req.params.id)

        const reviewPosted = product?.reviews?.find(
            userId => userId.postedBy.toString() === user.id.toString()
        )
        if(reviewPosted && (product && product.reviews) && user.reviews){
            console.log(reviewPosted)
            const productIndex = product.reviews.findIndex(review => review.postedBy === reviewPosted.postedBy)
            console.log(productIndex)
            product.reviews = product.reviews.filter(review => reviewPosted.postedBy !== review.postedBy)
            console.log(product.reviews)
            const userIndex = user.reviews.findIndex(review => review.product.toString() === req.params.id)
            console.log(userIndex)
            user.reviews = user.reviews.filter(review => review.product.toString() !== req.params.id)
            console.log(user.reviews)
            await user.save()
            await product.save()
            const finalProduct = await updatedRating(req.params.id)
            console.log(finalProduct)
        }
        else{
            res.status(400).send('no review or product found')
        }
    }catch(error){
        next(error)
    }
}

export {postReview,deleteReview}