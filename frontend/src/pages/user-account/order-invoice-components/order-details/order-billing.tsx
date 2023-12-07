import { OrderType } from "../../../../utils/types"


const OrderBilling = ({billingDetails,cardInfo}:{
    billingDetails:OrderType['billingDetails'],
    cardInfo:OrderType['cardInfo']
}) => {
    const capitalizeCardBrand = cardInfo.brand.charAt(0).toUpperCase() + cardInfo.brand.slice(1) 
    return(
        <div className="order-billing">
            <div>
            <p className="order-billing-title"><b>Billing Info:</b></p>
            </div>
            <div>
                <p className="order-billing-address">
                    {billingDetails.name}<br/>
                    {billingDetails.address.line1} <br/>
                    {billingDetails.address.line2}
                    {billingDetails.address.city}, {billingDetails.address.state}, {billingDetails.address.postal_code} <br/>
                    {billingDetails.address.country} <br />
                    {billingDetails.email} <br />
                    {capitalizeCardBrand} {cardInfo.last4}
                </p>
            </div>
                
                
        </div>
    )
} 

export default OrderBilling