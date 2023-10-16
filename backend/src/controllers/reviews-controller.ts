import { NextFunction, Request, Response } from "express";
import Product from "../models/product-model";
import { ReviewTypes } from "../types/type";
import { addNewRating, deleteProductReview, updateProductRating, updatedRating } from "../services/reviews-service";




const postReview = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {user} = req
        const id = req.params.id
        const body = req.body as ReviewTypes

        const product = await Product.findById(id)

        if(product){
            const alreadyRated = product?.reviews?.find(
                userId => userId.postedBy.toString() === user.id.toString()
            )
            if(alreadyRated){
                await updateProductRating(alreadyRated,body.rating,body.reviewTitle,body.reviewDesc,id)
            }else{
                await addNewRating(id,user,body.rating,body.reviewTitle,body.reviewDesc)
            }
            const finalProduct = await updatedRating(id)
    
            res.json(finalProduct)
        }else{
            res.status(404).json({Error:'Item Not Found'})
        }
    }catch(error){
        next(error)
    }
}

const deleteReview = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {user} = req

        const id = req.params.id

        const product = await Product.findById(req.params.id)

        const reviewPosted = product?.reviews?.find(
            userId => userId.postedBy.toString() === user.id.toString()
        )
        if(reviewPosted && (product && product.reviews) && user.reviews){

            await deleteProductReview(product,reviewPosted,user,id)

            const finalProduct = await updatedRating(id)
            
            res.json(finalProduct)
        }
        else{
            res.status(404).json({Error:'No Review Or Product Found'})
        }
    }catch(error){
        next(error)
    }
}

export {postReview,deleteReview}