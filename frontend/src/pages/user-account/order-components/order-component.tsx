import { Link } from "react-router-dom";
import { OrderType} from "../../../utils/types";



const OrderListComponent = ({order}:{order:OrderType}) => {
    const formatDate = new Date(order.createdAt).toLocaleDateString()

    return(
        <div className="order-container">
            <div className="left-side">
                <p className="order-detail">
                    <span>Order Date:</span>
                    {formatDate}
                </p>
                <p className="order-detail">
                    <span>Order Status:</span>
                    {order.orderStatus}
                </p>
                <p className="order-detail">
                    <span>Order Number:</span>
                    {order.id}
                </p>
                <p className="order-detail">
                    <span>Total:</span>
                    ${order.total}
                </p>
            </div>
            <div className="right-side">
                <Link to={order.id}>
                    <button className="detail-btn">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default OrderListComponent