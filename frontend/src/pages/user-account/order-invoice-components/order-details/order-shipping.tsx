import { OrderType } from "../../../../utils/types"



const OrderShipping = ({shippingName,shippingMethod,shippingAddress,orderStatus}:{
    shippingName:string
    shippingMethod:string,
    shippingAddress:OrderType['shippingAddress']
    orderStatus:string
}) => {

    const words = shippingMethod.split(" ");

    const shippingType = words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ")

    return (
        <div className="order-shipping">
     
            <div className="order-shipping-labels">
                <b>Order Status: </b>
                <b>Shipping Method:</b>
                <b>Shipping Address: </b>
            </div>
            <div className="order-shipping-info">
                <p>{orderStatus}</p>
                <p>{shippingType}</p>
                <p>
                    {shippingName}<br/>
                    {shippingAddress.line1} <br/>
                    {shippingAddress.line2}
                    {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postal_code} <br/>
                    {shippingAddress.country}
                </p>
            </div>
        </div>
    )
}

export default OrderShipping