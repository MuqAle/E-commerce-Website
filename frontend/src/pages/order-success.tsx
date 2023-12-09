import { Link } from "react-router-dom"
import '../style/css/order-success.css'


const OrderSuccess = () => {
    return(
        <div className="order-success">
            <p>Thank You For Your Order! <br /> 
            Your Order Has Been Received</p>
            <Link to='/shop-all'>
                <button>Continue Shopping</button>
            </Link>
        </div>
    )
}

export default OrderSuccess