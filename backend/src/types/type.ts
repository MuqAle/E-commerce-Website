import { Request } from "express"
import { Types } from "mongoose"

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
        review:string,
        rating:number
    }[]
    images:string[]
}

interface UserTypes{
    name:string,
    emailAddress:string,
    password:string,
    wishList?:Types.ObjectId[],
    shoppingCart?:{
        product:Types.ObjectId,
        quantity:number}[],
    reviews?:Types.ObjectId[],
    orders?:Types.ObjectId[]
}


interface ProductRequest extends Request,ProductDb{} 

export {
    Product,
    ProductDb,
    ProductRequest,
    UserTypes
}