
import { STRIPE_KEY, STRIPE_WEBHOOK } from '../config/config';
import Stripe from 'stripe';
const stripe = new Stripe(STRIPE_KEY as string, {
    apiVersion: '2023-08-16',
  })
import { NextFunction, Request,Response } from "express";
import { CartTypes} from '../types/type';
import Cart from '../models/shopping-cart-model';
import { checkoutSessionConfig, clearCart, createCustomer, createLineItems,createOrder} from '../services/stripe-service';





const checkoutSession =  async (req:Request, res:Response) => {
    const guestCart = req.session.guestCart as CartTypes
    const {user} = req
    let cartItems:Stripe.Checkout.SessionCreateParams.LineItem | typeof NaN[] = []
    let customer:Stripe.Customer | Stripe.DeletedCustomer | undefined

    if(user){
        const cart = await Cart.findById(user.shoppingCart) as CartTypes
        
        if(!user.stripeId){

          customer = await stripe.customers.create(createCustomer(user))
          user.stripeId = customer.id
          await user.save()

        }else{
          
            customer = await stripe.customers.retrieve(user.stripeId)
        }
        const userCart = cart?.products
        
        if(userCart){

            cartItems = await createLineItems(userCart) as []
            
        }
       
    }else{
        if(!guestCart){
          return res.status(400).send('No Items In Cart')
        }else{
          cartItems = await createLineItems(guestCart.products) as []
          customer = undefined
        }
    }
    if(cartItems.length === 0){
      return res.status(400).send('No Items In Cart')
    }if(cartItems.includes(NaN)){
      return res.status(400).send('Item In Cart Is Out Of Stock')
    }
    else{
      const session = await stripe.checkout.sessions.create(checkoutSessionConfig(
       user,
       req.session.id,
       customer?.id,
       cartItems as Stripe.Checkout.SessionCreateParams.LineItem[]
      ))
      return res.json(session.url)
    }
}



const stripeWebhook = async (req:Request,res:Response,_next:NextFunction) => {

  const webhookSecret = STRIPE_WEBHOOK
  const body = req.rawBody as string



  if(!webhookSecret){
    return res.status(400).send('Webhook secret is not configured.')
  }

    let event;
    const sig = req.headers['stripe-signature'] as string

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        webhookSecret
      )
      
    } catch (error) {
      if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
        return res.status(400).send(`Webhook Error: ${error.message}`);
      } else {
        return res.status(500).send('Internal server error');
      }
    }
    const data = event.data.object as Stripe.Checkout.Session
    const eventType = event.type
    

    if(eventType === "checkout.session.completed"){

      let customer

      if(data.customer){
        customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer
      }
      try{
        await createOrder(data,customer)
        await clearCart(data)
 
      }catch(error){
        console.log(error)
      }
    }
    return res.status(200).end()

}

export {checkoutSession,stripeWebhook}