import { OrderType } from "../../../../utils/types"


const OrderBilling = ({billingDetails,cardInfo}:{
    billingDetails:OrderType['billingDetails'],
    cardInfo:OrderType['cardInfo']
}) => {
    return(
        <div>
            <div> 
                <p>Billing Address:</p>
                <p>
                    {billingDetails.name}<br/>
                    {billingDetails.billingAddress.line1} <br/>
                    {billingDetails.billingAddress.line2} <br/>
                    {billingDetails.billingAddress.city},
                    {billingDetails.billingAddress.state},
                    {billingDetails.billingAddress.postal_code} <br/>
                    {billingDetails.billingAddress.country}
                </p>
            </div>
                <p><b>Email:</b>{billingDetails.email}</p>
            <p><b>Payment Method:</b>{cardInfo.brand}{cardInfo.last4}</p>
        </div>
    )
}

export default OrderBilling