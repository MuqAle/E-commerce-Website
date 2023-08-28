import { Request, Response } from "express";
import Product from "../models/product-model";
import { ParamsDictionary } from "express-serve-static-core"
import { ReviewTypes } from "../types/type";
import mongoose from "mongoose";
import User from "../models/user-model";



const postReview = async (req:Request<ParamsDictionary, unknown, ReviewTypes>,res:Response) => {
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
                        reviewDesc:reviewDesc
                    }
                },
                new:true,
                context:'query'
            })
            user.reviews = user.reviews?.concat({
                product:new mongoose.Types.ObjectId(req.params.id),
                reviewDesc:reviewDesc,
                rating:rating})
            await user.save()
        }
        const getAllReviews = await Product.findById(req.params.id)
        const totalReviews = getAllReviews?.reviews?.length
        let actualRating
        const reviewSum = getAllReviews?.reviews?.map((product) => product.rating)
        .reduce((prev,curr) => prev + curr, 0)
        if(reviewSum && totalReviews){
             actualRating = Math.round(reviewSum/totalReviews)
        }
        const finalProduct = await Product.findByIdAndUpdate(req.params.id,{
            overallRating:actualRating
        },{
            new:true
        })

        res.json(finalProduct)
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

export default postReview