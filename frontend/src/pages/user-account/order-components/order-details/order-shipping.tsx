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
            <div className="order-shipping-status">
                <p><b>Order Status:</b></p>
                <p>{orderStatus}</p>
            </div>
            <div className="order-shipping-method">
                <p><b>Shipping Method:</b></p>
                <p>{shippingType}</p>
            </div>
            <div className="order-shipping-address">
                <p><b>Shipping Address:</b></p>
                <p>
                    {shippingName}<br/>
                    {shippingAddress.line1} <br/>
                    {shippingAddress.line2}
                    {shippingAddress.city},
                    {shippingAddress.state},
                    {shippingAddress.postal_code} <br/>
                    {shippingAddress.country}
                </p>
            </div>
        </div>
    )
}

export default OrderShipping