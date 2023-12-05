
import { Document, Types } from "mongoose"
import Stripe from "stripe"


interface ProductDb extends Document {
    name:string,
    type:string,
    price:number,
    onSale:boolean,
    salePercentage?:number,
    salePrice?:number,
    description:string,
    stock:number,
    sold:number,
    metal: 'gold' | 'silver' | 'brass',
    colors:string[],
    overallRating:number,
    reviews:{
        postedBy:Types.ObjectId
        reviewDesc:string,
        reviewTitle:string
        rating:number,
        datePosted:Date
    }[]
    images:string[]
    imageFolder:string
}

interface UserTypes extends Document{
    id:Types.ObjectId
    firstName:string,
    lastName:string,
    email:string,
    passwordHash:string
    wishList?:Types.ObjectId[],
    shoppingCart:Types.ObjectId,
    reviews?:{
        product:Types.ObjectId,
        reviewDesc:string,
        reviewTitle:string,
        rating:number}[],
    orders?:Types.ObjectId[],
    isAdmin:boolean,
    stripeId?:string
}

interface UserRequest{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    isAdmin:boolean
}

interface ReviewTypes{
    reviewDesc:string,
    reviewTitle:string,
    datePosted:Date
    rating:number
}

interface WishListTypes{
    prodId:string
}

interface OrderType{
    products:{
        product:Types.ObjectId,
        quantity:number
    }[],
    name:string,
    email:string,
    shippingName:string,
    shippingAddress:{
        line1:string,
        line2:string,
        postal_code:string,
        city:string,
        sate:string,
    },
    paymentType:string,
    billingDetails:{
        billingAddress:OrderType['shippingAddress']
        email:string,
        name:string
    }
    cardInfo:{
        brand:string,
        last4:string
    }
    userId:string | Types.ObjectId,
    paymentIntentId:string,
    orderStatus:string,
    shippingCost:number,
    tax:number,
    subtotal:number,
    total:number
}

interface CartTypes{
    products:{
        product:Types.ObjectId,
        quantity:number
    }[],
    user?:Types.ObjectId,
    cartTotal:number,
    cartPrice:number,
}

interface GuestCartTypes{
    products:{
        product:ProductDb,
        quantity:number
    }[],
    cartTotal:number,
    cartPrice:number,
}


interface SessionTypes extends Document {
  _id: string;
  expires: Date;
  session: {
    cookie: {
      originalMaxAge: number;
      expires: Date | null;
      secure: boolean | null;
      httpOnly: boolean;
      domain: string | null;
      path: string;
      sameSite: string | null;
    };
    guestCart: CartTypes;
  };
}

interface LineItem extends Stripe.Checkout.SessionCreateParams.LineItem {
    price_data: {
      currency: string,
      product_data: {
        name: string,
        images: string[],
        metadata: {
            item: string ,
        };
      };
      unit_amount: number,
    },
    quantity: number,
  }

interface StripeCart {
    
        product:string,
        quantity:number

}


  





export {
    ProductDb,
    UserRequest,
    UserTypes,
    ReviewTypes,
    WishListTypes,
    OrderType,
    CartTypes,
    SessionTypes,
    LineItem,
    StripeCart,
    GuestCartTypes
  
}