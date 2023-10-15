import express from 'express'
import {checkoutSession,stripeWebhook} from '../controllers/stripe-controller'

const checkoutRouter = express.Router()

checkoutRouter.post('/', checkoutSession)
checkoutRouter.post('/webhook',stripeWebhook)

export default checkoutRouter