import { Link } from "react-router-dom"
import '../../style/css/cart-product.css'
import deleteBtn from '../../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'
import plus from '../../assets/imgs/svg-imgs/add_FILL0_wght100_GRAD0_opsz48.svg'
import subtract from '../../assets/imgs/svg-imgs/remove_FILL0_wght100_GRAD0_opsz48.svg'
import { ProductCartType } from "../../utils/types"




const ProductCart = ({cart, favorited, moveToWishlist ,increaseAmount, decreaseAmount,deleteProductCart}:ProductCartType) => {
    return (
        <div className="product-in-cart">
            <div className="product-cart-image">
                <Link to={`/${cart.product.type}/${cart.product._id}`}>
                    <img src={cart.product.images[0]}/>
                </Link>
            </div>
            <div className="product-cart-info">
                <div>
                <Link className="cart-product-name" to={`/${cart.product.type}/${cart.product._id}`}>
                    {cart.product.name}
                </Link>
                {
                    
                    cart.product.stock == 0 ?
                    <p style={{marginTop:'2px',color:'#706d6d'}}>Out of Stock</p> : 
                    null
                }
               
                </div>
                
                <div className="cart-amount">
                    <button className="cart-amount-btn" onClick={() => decreaseAmount(cart.product._id)}><img src={subtract}/></button>
                    <p>{cart.quantity}</p>
                    <button className="cart-amount-btn" onClick={() => increaseAmount(cart.product._id)}><img src={plus}/></button>
                </div>
                {cart.product.onSale ?
                        <p className='price sale-price'>${cart.product.salePrice?.toFixed(2)} <s>${cart.product.price.toFixed(2)}</s> </p>
                        :
                        <p className='price'>${cart.product.price.toFixed(2)}</p>
                    }
               
            </div>
            {
                    favorited(cart.product._id) ? 
                    null : 
                    <button className="move-to-wishlist" onClick={() => moveToWishlist(cart.product._id)}>Move To Wishlist</button>
                }
            <button className="delete-product-cart" onClick={() => deleteProductCart(cart.product._id)}><img src={deleteBtn}/></button>
        </div>
    )
}

export default ProductCart