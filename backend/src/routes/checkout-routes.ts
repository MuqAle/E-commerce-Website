import express from 'express'
import checkoutSession from '../controller/stripe-controller'

const checkoutRouter = express.Router()

checkoutRouter.post('/', checkoutSession)

export default checkoutRouter