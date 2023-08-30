
import { Document, Types } from "mongoose"

interface Product{
    name:string,
    idProduct:string,
    type:string,
    price:number,
    onSale:boolean,
    salePercentage?:number,
    description:string,
    Gallery:string[],
}

interface ProductDb {
    name:string,
    type:string,
    price:number,
    onSale:boolean,
    salePercentage?:number,
    description:string,
    stock:number,
    sold:number,
    metal: 'gold' | 'silver' | 'brass',
    colors:string[],
    overallRating:number,
    reviews?:{
        postedBy:Types.ObjectId
        reviewDesc:string,
        rating:number,
        datePosted:Date
    }[]
    images:string[]
}

interface UserTypes extends Document{
    id:Types.ObjectId
    name:string,
    email:string,
    passwordHash:string
    wishList?:Types.ObjectId[],
    shoppingCart?:{
        product:Types.ObjectId,
        quantity:number}[],
    reviews?:{
        product:Types.ObjectId,
        reviewDesc:string,
        rating:number}[],
    orders?:Types.ObjectId[],
    isAdmin:boolean
}

interface UserRequest{
    name:string,
    email:string,
    password:string
}

interface ReviewTypes{
    reviewDesc:string,
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
    firstName:string,
    lastName:string,
    address:{
        street:string,
        city:string,
        state:string,
        zipcode:string
    },
    payment:object,
    userId:string | Types.ObjectId,
    orderStatus:string
}




export {
    Product,
    ProductDb,
    UserRequest,
    UserTypes,
    ReviewTypes,
    WishListTypes,
    OrderType
}