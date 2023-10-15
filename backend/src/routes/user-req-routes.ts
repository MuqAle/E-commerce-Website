import express from 'express'
import {deleteReview, postReview} from '../controllers/reviews-controller'
import addWishList from '../controllers/wishlist-controller'
import { getUserProfile } from '../controllers/user-controller'

const userReqRouter = express.Router()

userReqRouter.put('/add-reviews/:id', postReview )
userReqRouter.put('/wishlist', addWishList)
userReqRouter.put('/delete-reviews/:id', deleteReview )
userReqRouter.get('/profile', getUserProfile)


export default userReqRouter