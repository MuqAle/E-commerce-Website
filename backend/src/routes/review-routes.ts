import express from 'express'
import postReview from '../controller/reviews-controller'

const reviewRouter = express.Router()

reviewRouter.put('/:id', postReview )

export default reviewRouter