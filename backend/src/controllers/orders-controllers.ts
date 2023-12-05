import Order from "../models/orders-model";
import { NextFunction, Request,Response } from "express";
import { OrderType } from "../types/type";
import { filterBody, updateOrderLogic } from "../services/order-service";


const getAllOrders = async(_req:Request,res:Response) => {

    const allOrders = await Order.find({}).populate({
        path: 'products.product',
        model: 'Product', 
        select: 'name price images onSale salePercentage salePrice type' 
      })

    res.json(allOrders)
}


const getOneOrder = async (req:Request,res:Response,next:NextFunction) => {

    const id = req.params.id
    try{
        const order = await Order.findById(id).populate({
            path: 'products.product',
            model: 'Product', 
            select: 'name price images onSale salePercentage salePrice type' 
          })

        if(order){
            res.json(order)
        }else{
           res.status(404).json({Error:'Order Not Found'})
        }
    }catch(error){
        next(error)
    }
   
}

const updateOrder = async (req:Request,res:Response,next:NextFunction) => {
    const body = req.body as OrderType
    const id = req.params.id

    const disallowedFields = filterBody(body)

    if(disallowedFields.length > 3){
        return res.status(400).json({
            Error: 'Invalid fields in the request: ' + disallowedFields.join(', '),
          });
        }

    try{
       const updatedProduct = await updateOrderLogic(body.name,body.email,body.orderStatus,id)

       if(!updatedProduct){
        return res.status(404).json({Error:'Order Not Found'})
       }
        return res.json(updatedProduct)
    }catch(error){
        return next(error)
    }
   
}

export {getAllOrders,getOneOrder,updateOrder}
