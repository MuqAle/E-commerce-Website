import express from 'express'
import postReview from '../controller/reviews-controller'
import { addWishList } from '../controller/user-controller'

const userReqRouter = express.Router()

userReqRouter.put('/reviews/:id', postReview )
userReqRouter.put('/wishlist', addWishList)

export default userReqRouter