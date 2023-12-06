import { OrderType } from "../../../../utils/types"


const OrderBilling = ({billingDetails,cardInfo}:{
    billingDetails:OrderType['billingDetails'],
    cardInfo:OrderType['cardInfo']
}) => {
    const capitalizeCardBrand = cardInfo.brand.charAt(0).toUpperCase() + cardInfo.brand.slice(1) 
    return(
        <div className="order-billing">
            <div className="order-billing-address"> 
                <p className="order-billing-title"><b>Billing Address:</b></p>
                <p className="order-billing-address">
                    {billingDetails.name}<br/>
                    {billingDetails.address.line1} <br/>
                    {billingDetails.address.line2}
                    {billingDetails.address.city}, {billingDetails.address.state}, {billingDetails.address.postal_code} <br/>
                    {billingDetails.address.country}
                </p>
            </div>
                <p className="order-billing-email"><b>Email:</b> {billingDetails.email}</p>
                <p className="order-payment-method"><b>Payment Method:</b> {capitalizeCardBrand} {cardInfo.last4}</p>
        </div>
    )
}

export default OrderBilling