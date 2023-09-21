import { Types } from "mongoose"
import Product from "../models/product-model"
import { CartTypes, UserTypes } from "../types/type"
import Stripe from "stripe"
import { STRIPE_KEY } from "../config/config"
import Order from "../models/orders-model"
const stripe = new Stripe(STRIPE_KEY as string, {
    apiVersion: '2023-08-16',
  })


const createPriceData = async (productId : Types.ObjectId, quantity:number) => {

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
        name:user.name,
        email:user.email,
        metadata: {
          userId: user.id.toString(),
        },
      })
}


const checkoutSessionConfig = (user:UserTypes,sessionID:string,customer:string | undefined,cartItems:Stripe.Checkout.SessionCreateParams.LineItem[]) =>  {

   return ({line_items: cartItems ,
    client_reference_id: user ? user.id.toString() : sessionID,
    customer_email:user ? user.email : undefined,
    customer:customer,
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
  
    ]
  }) as Stripe.Checkout.SessionCreateParams
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

export {
    createLineItems,
    createCustomer,
    checkoutSessionConfig,
    createOrder
}