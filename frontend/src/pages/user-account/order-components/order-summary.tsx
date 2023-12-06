import { useEffect } from "react"
import OrderBilling from "./order-details/order-billing"
import OrderProducts from "./order-details/order-products"
import OrderShipping from "./order-details/order-shipping"
import OrderTotal from "./order-details/order-total"
import { useImmer } from "use-immer"
import { getOneOrder } from "../../../services/orders"
import { useParams } from "react-router-dom"
import { OrderType } from "../../../utils/types"

const OrderSummary = () => {
    const [order, setOrder] = useImmer<OrderType>(Object) 
    const {id} = useParams<keyof {id:string}>() as {id:string}


    useEffect(() => {
            const controller = new AbortController()
            getOneOrder(id).then((response) => {
                setOrder(response)
            })
            return () => {
                controller.abort()
        }
      
    },[id, setOrder])

   

    const discountFunction = () => {
        let discount = 0
        if(order && order.id){
            for(const orderItem of order.products){
                const salePrice = orderItem.product.salePrice ? 
                +((orderItem.product.salePrice * orderItem.quantity) - (orderItem.product.price * orderItem.quantity)).toFixed(2)
                 : 0
                 discount += salePrice
            }
        }
        return discount
    }

    if(order && order.id){
        return(
            <div>
                <h1>Order Details:{order.id}</h1>
                <div>
                    <OrderShipping 
                    shippingName={order.shippingMethod} 
                    shippingMethod={order.shippingMethod} 
                    shippingAddress={order.shippingAddress} 
                    orderStatus={order.orderStatus}/>
                    <OrderBilling 
                    billingDetails={order.billingDetails} 
                    cardInfo={order.cardInfo}/>
                </div>
                <h2>Order Summary</h2>
                <OrderTotal 
                shippingCost={order.shippingCost} 
                tax={order.tax} 
                subtotal={order.subtotal} 
                total={order.total} discount={discountFunction()}/>
                <OrderProducts products={order.products}/>   
            </div>
        )
    }else{
        return(
            <div className="empty-page">

            </div>
        )
    }

}

export default OrderSummary