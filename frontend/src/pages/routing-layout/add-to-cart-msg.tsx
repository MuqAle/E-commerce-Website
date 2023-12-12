import { ProductDb } from "../../utils/types"
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag.svg'


const AddedToCartMsg = ({product,shopping}:{
    product:ProductDb,
    shopping:number
}) => {

    return(
        <div className="cart-msg">
        <div className="cart-msg-title">
            <p>Shopping Bag: {shopping}</p>
            <img src={shoppingBag} alt="shopping bag" />
        </div>
        <div className="cart-msg-product">
        <img className="cart-msg-product-img" src={product.images && product.images[0]} alt='product image' />
        <div className="cart-msg-product-info">
            <p>{product.name}</p>
            {product.onSale ? <p>${product.salePrice} <s>${product.price}</s> </p>: <p>${product.price}</p>}
            <p>Quantity: 1</p>
        </div>
        </div>
        
    </div>
    )
   
}

export default AddedToCartMsg
