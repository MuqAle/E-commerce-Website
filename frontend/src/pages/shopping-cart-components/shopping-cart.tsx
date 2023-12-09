import { Link } from "react-router-dom"
import ProductCart from "./product-cart"
import '../../style/css/cart.css'
import Breadcrumbs from "../../components/breadcrumbs"
import { CartCheckoutTypes} from "../../utils/types"
import checkout from "../../services/checkout"
import { useImmer } from "use-immer"
import axios from "axios"




const ShoppingCart = ({
    cart,
    moveToWishlist,
    favorited,
    increaseAmount,
    decreaseAmount,
    deleteProductCart,
    setLoading,
    token}:CartCheckoutTypes) => {

    const [error,setError] = useImmer('')

    const clickCheckout = async() => {
        try{
            setLoading(true)
            const response = await checkout(token)
            window.location.href = response

        }catch(error){
            if (axios.isAxiosError(error))  {
                setError(error.response?.data)
              }
        }finally{
            setLoading(false)
        }
    }

    if(cart.products){
    return (
        <div>
            <Breadcrumbs name={null}/>
            <h1 className="title">Cart</h1>
           {cart.products.length === 0 ?
                <div className="empty">
                    <p>Your Cart Is Empty</p>
                    <Link to={'/shop-all'}><button>Shop All Jewelry</button></Link>
                </div>
                    :
            <div className="shopping-cart-full">
                <div className="shopping-cart">
                    <div className="shopping-cart-header">
                        <h4>Your Bag</h4>
                        <Link to={'/shop-all'}>Continue Shopping</Link>
                    </div>
                    <div className="shopping-cart-container">
                        {cart.products.map((cart) => (
                            <ProductCart 
                            moveToWishlist={moveToWishlist}
                            favorited={favorited} 
                            increaseAmount={increaseAmount} 
                            decreaseAmount={decreaseAmount} 
                            deleteProductCart={deleteProductCart} 
                            cart={cart} 
                            key={cart.product._id}></ProductCart>
                        ))}
                    </div>
                </div>
                <div className="shopping-cart-summary">
                    <h4>Order Summary</h4>
                    <div className="subtotal">
                        <p>Subtotal</p>
                        <p className="total-price">${cart.cartPrice.toFixed(2)}</p>
                    </div>
                    <p className="shipping">Shipping and taxes calculated at checkout</p>
                    <button onClick={clickCheckout} className="checkout-btn">Secure Checkout</button>
                    <p style={{marginTop:'10px',color:'rgb(188, 11, 11)'}}>{error}</p>
                </div>
            </div>
            }
        </div>
    )}else{
        return(
            <div className="empty-page">

            </div>
        )
       
    }
}

export default ShoppingCart