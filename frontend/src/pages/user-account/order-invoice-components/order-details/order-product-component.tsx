import { Link, useResolvedPath } from "react-router-dom"
import { CartTypes} from "../../../../utils/types"


const OrderProductComponent = ({product}:{product:CartTypes['products'][0]}) => {

    const base = useResolvedPath('/').pathname
    
    return(
        <div className="order-product-single">
                <div className="order-product-info">
                    <img src={product.product.images[0]}/>
                    
                    <p>
                    <Link to={`${base}shop-all/${product.product._id}`}>{product.product.name}
                    </Link> 
                    </p>
                    
                </div>
                 
                {
                    product.product.salePercentage ? 
                    <div className="order-product-price-container">
                        <p><s>${product.product.price}</s></p>
                        <p>${product.product.salePrice}</p>
                    </div>
                    :
                    <div className="order-product-price">
                        <p >${product.product.price}</p>
                    </div>
                }
                <div className="order-product-quantity">
                    <p >{product.quantity}</p>
                </div>
                <div className="order-product-full-price">
                    <p >${product.product.price}</p>
                </div>
 
        </div>
    )
}

export default OrderProductComponent