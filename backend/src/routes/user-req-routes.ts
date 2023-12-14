import express from 'express'
import {deleteReview, postReview} from '../controllers/reviews-controller'
import addWishList from '../controllers/wishlist-controller'
import { changeUserPassword, changeUserProfile, getUserProfile } from '../controllers/user-controller'

const userReqRouter = express.Router()

userReqRouter.put('/add-reviews/:id', postReview )
userReqRouter.put('/wishlist/:id', addWishList)
userReqRouter.put('/delete-reviews/:id', deleteReview )
userReqRouter.get('/profile', getUserProfile)
userReqRouter.put('/change-profile',changeUserProfile)
userReqRouter.put('/change-password',changeUserPassword)


export default userReqRouter