import { CartTypes } from "../../../../utils/types";
import OrderProductComponent from "./order-product-component";


const OrderProducts = ({products}:{products:CartTypes['products']}) => {

    return(
        <div className="order-products-container">
            <div className="order-products-container-header">
                <p>Item</p>
                <p>Price</p>
                <p>Qty</p>
                <p>Amount</p>
            </div>
            <div className="order-products-container-list">
            {
                 products.map((product) => (
                    <OrderProductComponent key={product.product._id} product={product}/>
                ))
            }
            </div>
            
        </div>
       
    )
}

export default OrderProducts