import { Link, useResolvedPath } from "react-router-dom"
import { CartTypes} from "../../../../utils/types"


const OrderProductComponent = ({product}:{product:CartTypes['products'][0]}) => {

    const base = useResolvedPath('/').pathname
    
    return(
        <div>
            <img src={product.product.images[0]}/>
            <div>
                <Link to={`${base}shop-all/${product.product._id}`}>
                    <p>{product.product.name}</p>
                </Link>
                {
                    product.product.salePercentage ? 
                    <div>
                        <p><s>{product.product.price}</s></p>
                        <p>{product.product.salePrice}</p>
                    </div>
                    :
                    <p>{product.product.price}</p>
                }
                <p>{product.quantity}</p>
                <p>{product.product.price}</p>
            </div>
        </div>
    )
}

export default OrderProductComponent