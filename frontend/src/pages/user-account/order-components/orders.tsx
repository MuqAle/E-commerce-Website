import { OrderType} from "../../../utils/types"
import OrderListComponent from "./order-component"



const UserOrder = ({orders}:{orders:OrderType[]}) => {
    return(
        <div className="order-main-container">
            <h2 className="order-title">Orders</h2>
            <div className="order-list">
                {
                    orders.map((order) => (
                        <OrderListComponent order={order} ></OrderListComponent>
                    ))
                }
            </div>
        </div>
    )
}

export default UserOrder