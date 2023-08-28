import { Request, Response } from "express";
import Product from "../models/product-model";
import { ParamsDictionary } from "express-serve-static-core"
import { ReviewTypes } from "../types/type";
import mongoose from "mongoose";



const postReview = async (req:Request<ParamsDictionary, unknown, ReviewTypes>,res:Response) => {
    try{
        const {_id} = req.user
        const {user} = req
        const {rating,reviewDesc} = req.body 

        const product = await Product.findById(req.params._id)

        const alreadyRated = product?.reviews?.find(
            userId => userId.postedBy.toString() === _id.toString()
        )

        if(alreadyRated){
            const updateRating = await Product.updateOne(
                {
                reviews:{
                    $elemMatch:alreadyRated
                },
                },{
                $set:{
                    "reviews.rating":rating,
                    "reviews.reviewDesc":reviewDesc}
                },{
                    new:true,
                    context:"query"
                }
            )
            res.json(updateRating)
        }else{
            const rateProduct = await Product.findByIdAndUpdate(req.params._id,{
                $push: {
                    reviews:{
                        postedBy:_id,
                        rating:rating,
                        reviewDesc:reviewDesc
                    }
                },
                new:true,
                context:'query'
            })
            user.reviews = user.reviews?.concat({
                product:new mongoose.Types.ObjectId(req.params._id),
                reviewDesc:reviewDesc,
                rating:rating})
            await user.save()
            res.json(rateProduct)
        }
    }catch(error){
        res.status(400).send(error)
    }
}

export default postReview