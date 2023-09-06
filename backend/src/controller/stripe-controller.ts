import Stripe from 'stripe';
const stripe = new Stripe(STRIPE_KEY as string, {
    apiVersion: '2023-08-16',
  })
import { Request,Response } from "express";
import User from '../models/user-model';
import { STRIPE_KEY } from '../config/config';
import Product from '../models/product-model';
import mongoose from 'mongoose'
import { CartTypes } from '../types/type';


interface LineItem extends Stripe.Checkout.SessionCreateParams.LineItem {
    price_data: {
      currency: string,
      product_data: {
        name: string,
        images: string[],
        description: string,
        metadata: {
            item: string ,
        };
      };
      unit_amount: number,
    },
    quantity: number,
  }
  

const createPriceData = async (productId : mongoose.Types.ObjectId, quantity:number) => {

    const product = await Product.findById(productId)
    if(product){
        return{
            price_data:{
                currency:"usd",
                product_data:{
                    name: product.name,
                    image:product.images,
                    description: product.description,
                    metadata:{
                        item:product._id.toString()
                    }
                },
                unit_amount:product.onSale ? 
                product.price * product.salePercentage * 100:
                product.price * 100
            },
            quantity:quantity
        }
    }else{
        return 
    }
}


const checkoutSession =  async (req:Request, res:Response) => {
    const anonCart = req.cookies.anonymousCart as Array<CartTypes>
    let cartItems:LineItem[] = []
    if(req.user){
        const userId = req.user.id
        const user = await User.findById(userId)
        const userCart = user?.shoppingCart
        if(userCart){
            cartItems = await Promise.all(
                userCart.map(async (item) => {
                  return await createPriceData(item.product, item.quantity);
                })
              ) as []
        }
       
    }else{
        cartItems = await Promise.all(
            anonCart.map(async (item) => {
              return await createPriceData(item.product, item.quantity);
            })
          ) as []
    }

  const session = await stripe.checkout.sessions.create({
    line_items: cartItems ,
    mode: 'payment',
    success_url:'',
  })

  res.redirect(303,session.url as string)
}

export default checkoutSession