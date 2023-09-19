
import { STRIPE_KEY, STRIPE_WEBHOOK } from '../config/config';
import Stripe from 'stripe';
const stripe = new Stripe(STRIPE_KEY as string, {
    apiVersion: '2023-08-16',
  })
import { NextFunction, Request,Response } from "express";
import Product from '../models/product-model';
import mongoose from 'mongoose'
import { CartTypes} from '../types/type';
import Cart from '../models/shopping-cart-model';
import Order from '../models/orders-model';






const createPriceData = async (productId : mongoose.Types.ObjectId, quantity:number) => {

    const product = await Product.findById(productId)
    if(product){
        return{
            price_data:{
                currency:"usd",
                product_data:{
                    name: product.name,
                    images:product.images,
                    metadata:{
                      item:productId.toString() 
                    }
                },
                unit_amount:product.onSale ? 
                product.salePrice && (product.salePrice * 100):
                product.price * 100
            },
            quantity:quantity,
        }
    }else{
        return 
    }
}




const checkoutSession =  async (req:Request, res:Response) => {
    const guestCart = req.session.guestCart as CartTypes
    const {user} = req
    let cartItems:Stripe.Checkout.SessionCreateParams.LineItem[] = []
    let customer 
    if(user){
        const cart = await Cart.findById(user.shoppingCart) as CartTypes
        if(!user.stripeId){
          customer = await stripe.customers.create({
            name:user.name,
            email:user.email,
            metadata: {
              userId: user.id.toString(),
            },
          })
          user.stripeId = customer.id
          await user.save()
        }else{
          customer = await stripe.customers.retrieve(user.stripeId)
        }
         

        const userCart = cart?.products
        
        if(userCart){
            cartItems = await Promise.all(
                userCart.map(async (item) => {
                  return await createPriceData(item.product, item.quantity);
                })
              ) as []
        }
       
    }else{
        cartItems = await Promise.all(
            guestCart.products.map(async (item) => {
              return await createPriceData(item.product, item.quantity);
            })
          ) as []
    }



    if(cartItems.length === 0){
      res.status(400).send('No Items In Cart')
    }else{
      const session = await stripe.checkout.sessions.create({
        line_items: cartItems ,
        client_reference_id: user ? user.id.toString() : req.sessionID,
        customer_email:user ? user.email : undefined,
        customer:customer?.id || undefined,
        automatic_tax:{
          enabled:true
        },
        shipping_address_collection:{
          allowed_countries:['US']
        },
        mode: 'payment',
        success_url:'https://e-commerce-website-1mzt-gnix8wc29-muqale.vercel.app/',
        shipping_options: [
          {
    
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 500,
                currency: "usd",
              },
              display_name: "Standard shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          }
      
        ],
      })
      res.json(session.url)
    }

}




const createOrder = async (data:Stripe.Checkout.Session,customer:Stripe.Customer | undefined) => {


  const checkoutSession = await stripe.checkout.sessions.listLineItems(data.id,
    {
      expand:['data.price.product']
    })
  
  const Items = checkoutSession.data

  const products = Items.map((item) => {
    const product = item.price?.product;
    let metadata
    if (product && typeof product !== 'string' && 'metadata' in product) {
      metadata = product.metadata.item;
    }
    return {
      product:metadata,
      quantity: item.quantity,
      price:item.price?.unit_amount as number / 100
    }
  })

  const newOrder = new Order({
    products:products,
    name:data.customer_details?.name,
    email:data.customer_details?.email,
    shippingAddress: data.customer_details?.address,
    userId:data.customer ? customer?.metadata.userId : 'Guest User',
    paymentIntentId: data.payment_intent,
    shippingCost:data.shipping_cost?.amount_subtotal as number /100,
    tax:data.total_details?.amount_tax as number /100,
    subtotal:data.amount_subtotal as number /100,
    total:data.amount_total as number/ 100
  })

  try{
     await newOrder.save()
  }catch(error){
    console.log(error)
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
        return res.status(500).send('Internal server error.');
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
      }catch(error){
        console.log(error)
      }
    }
    return res.status(200).end()

}

export {checkoutSession,stripeWebhook}