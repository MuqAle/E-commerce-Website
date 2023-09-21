import Order from "../models/orders-model";
import { OrderType } from "../types/type";


const filterBody = (body:OrderType) => {
    const allowedFields = ['name', 'email', 'orderStatus'];

    const disallowedFields = Object.keys(body).filter(
      (field) => !allowedFields.includes(field)
    );

    return disallowedFields
}

const updateOrderLogic = async(name:string,email:string,orderStatus:string,id:string) => {
    const order = {
        name:name,
        email:email,
        orderStatus:orderStatus
    }

    const changeProduct = await Order.findByIdAndUpdate(id,order,
        {new:true,
        runValidators:true,
        context:'query'})
        
        return changeProduct
}

export {filterBody,updateOrderLogic}