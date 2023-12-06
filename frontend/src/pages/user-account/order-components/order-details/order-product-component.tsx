import { Link, useResolvedPath } from "react-router-dom"
import { CartTypes} from "../../../../utils/types"


const OrderProductComponent = ({product}:{product:CartTypes['products'][0]}) => {

    const base = useResolvedPath('/').pathname
    
    return(
        <div className="order-product-single">
            <img src={product.product.images[0]}/>
            <div className="order-product-name"> 
                <Link to={`${base}shop-all/${product.product._id}`}>
                    <p>{product.product.name}</p>
                </Link>
                {
                    product.product.salePercentage ? 
                    <div className="order-product-price-container">
                        <p><s>{product.product.price}</s></p>
                        <p>{product.product.salePrice}</p>
                    </div>
                    :
                    <p className="order-product-price">{product.product.price}</p>
                }
                <p className="order-product-quantity">{product.quantity}</p>
                <p className="order-product-price">{product.product.price}</p>
            </div>
        </div>
    )
}

export default OrderProductComponent