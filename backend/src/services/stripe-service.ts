import { Types } from "mongoose"
import Product from "../models/product-model"
import { CartTypes,StripeCart,UserTypes } from "../types/type"
import Stripe from "stripe"
import { STRIPE_KEY } from "../config/config"
import Order from "../models/orders-model"
import evenRound from "../utils/rounding"
import Cart from "../models/shopping-cart-model"
import Session from "../models/session-model"
import User from "../models/user-model"


const stripe = new Stripe(STRIPE_KEY as string, {
    apiVersion: '2023-08-16',
  })


const createPriceData = async (productId : Types.ObjectId, quantity:number) => {

    const product = await Product.findById(productId)
    if(product){
      if(product.stock === 0){
        return NaN
      }else{
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
              product.salePrice && evenRound((product.salePrice * 100),0):
              evenRound(product.price * 100,0)
          },
          quantity:quantity,
      }
      }
    }else{
        return 
    }
}

const createLineItems = async(array:CartTypes['products']) => {
    const lineItems = await Promise.all(
        array.map(async (item) => {
            return await createPriceData(item.product, item.quantity);
          })
    )

    return lineItems
}

const createCustomer =(user:UserTypes) => {
    return ({
        name:`${user.firstName} ${user.lastName}`,
        email:user.email,
        metadata: {
          userId: user.id.toString(),
        },
      })
}


const checkoutSessionConfig = (user:UserTypes,sessionID:string,customer:string | undefined,cartItems:Stripe.Checkout.SessionCreateParams.LineItem[]) =>  {

   return ({line_items: cartItems ,
    client_reference_id: user ? user.shoppingCart.toString() : sessionID,
    customer:user ? customer : undefined,
    automatic_tax:{
      enabled:true
    },
    customer_update:{
      shipping:user ? 'auto' : undefined
    },
    shipping_address_collection:{
      allowed_countries:['US']
    },
    mode: 'payment',
    success_url:'http://localhost:5173',
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
  
    ]
  }) as Stripe.Checkout.SessionCreateParams
}

const updateProductInventory = async(products:StripeCart[]) => {
  for(const product of products){
      const foundProduct = await Product.findById(product.product) 
      if(foundProduct){
        foundProduct.stock -= product.quantity
        foundProduct.sold += product.quantity
        await foundProduct.save()
      }
  }
}

const createOrder = async (data:Stripe.Checkout.Session,customer:Stripe.Customer | undefined) => {


    const checkoutSession = await stripe.checkout.sessions.listLineItems(data.id,
      {
        expand:['data.price.product']
      })


    const paymentIntent = await stripe.paymentIntents.retrieve(
      data.payment_intent as string,
      {
        expand:['payment_method']
      }  
  )

  const shippingType = await stripe.shippingRates.retrieve(data.shipping_cost?.shipping_rate as string)

  const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod

    const Items = checkoutSession.data

  
    const products = Items.map((item) => {
      const product = item.price?.product;
      let metadata
      if (product && typeof product !== 'string' && 'metadata' in product) {
        metadata = product.metadata.item;
      }
      return {
        product:metadata as string,
        quantity: item.quantity as number,
        price:item.price?.unit_amount as number / 100
      }
    })
  
    const newOrder = new Order({
      products:products,
      name:data.customer_details?.name,
      email:data.customer_details?.email,
      shippingName:data.shipping_details?.name,
      shippingAddress: data.customer_details?.address,
      userId:data.customer ? customer?.metadata.userId : 'Guest User',
      paymentIntentId: data.payment_intent,
      billingDetails:paymentMethod.billing_details,
      paymentType:paymentMethod.type,
      cardInfo:{
        brand:paymentMethod.card?.brand,
        last4:paymentMethod.card?.last4,
      },
      shippingCost:data.shipping_cost?.amount_subtotal as number /100,
      shippingMethod:shippingType.display_name,
      tax:data.total_details?.amount_tax as number /100,
      subtotal:data.amount_subtotal as number /100,
      total:data.amount_total as number/ 100
    })
  
    try{
      if(customer){
        const user = await User.findById(customer.metadata.userId)
        user?.orders?.push(newOrder._id)
        await user?.save()
      }
       await newOrder.save()
       await updateProductInventory(products)
    }catch(error){
        console.log(error)
    }
  }

  const clearCart = async(session:Stripe.Checkout.Session) => {
    
   
    if(session.customer){
      const userCart = await Cart.findById(session.client_reference_id) 
      if(userCart){
        userCart.products = []
        userCart.cartPrice = 0
        userCart.cartTotal = 0
        await userCart.save()
      }
    }else{
      const guestCart =  await Session.findById(session.client_reference_id)
      if(guestCart){
        guestCart.session.guestCart.products = []
        guestCart.session.guestCart.cartPrice = 0
        guestCart.session.guestCart.cartTotal = 0
        await guestCart.save()
      }
    }
  }


export {
    createLineItems,
    createCustomer,
    checkoutSessionConfig,
    createOrder,
    clearCart,
    updateProductInventory
}