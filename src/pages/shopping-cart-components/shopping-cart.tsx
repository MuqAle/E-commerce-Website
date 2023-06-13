import { Link } from "react-router-dom"
import ProductCart from "./product-cart"
import '../../style/css/cart.css'
import Breadcrumbs from "../../components/breadcrumbs"


interface Cart {
    array:
    {product:{name:string,
        id:string,
        type:string,
        price:number,
        onSale:boolean,
        salePrice:number,
        description:string,
        Gallery:string[]}
        amount:number
      }[],
    increaseAmount:(id:string) => void,
    decreaseAmount:(id:string) => void,
    deleteProductCart : (id:string) => void
}

const ShoppingCart = ({array,increaseAmount,decreaseAmount,deleteProductCart}:Cart) => {
    return (
        <div>
            <Breadcrumbs/>
            <h1 className="title">Cart</h1>
           {array.length === 0 ?
                <div className="empty">
                    <p>Your Cart Is Empty</p>
                    <button><Link to={'/shop-all'}>Shop All Jewelry</Link></button>
                </div>
                    :
            <div className="shopping-cart-full">
                <div className="shopping-cart">
                    <div className="shopping-cart-header">
                        <h4>Your Bag</h4>
                        <Link to={'/shop-all'}>Continue Shopping</Link>
                    </div>
                    <div className="shopping-cart-container">
                        {array.map((cart) => (
                            <ProductCart increaseAmount={increaseAmount} decreaseAmount={decreaseAmount} deleteProductCart={deleteProductCart} cart={cart} key={cart.product.id}></ProductCart>
                        ))}
                    </div>
                </div>
                <div className="shopping-cart-summary">
                    <h4>Order Summary</h4>
                    <div className="subtotal">
                        <p>Subtotal</p>
                        <p className="total-price">${array.reduce((a,b) => a + (b.product.salePrice * b.amount),0).toFixed(2)}</p>
                    </div>
                    <p className="shipping">Shipping and taxes calculated at checkout</p>
                    <a target="_blank"  href="https://buy.stripe.com/test_5kA9DY3hB0xN9awaEE"><button className="checkout-btn">Secure Checkout</button></a>
                </div>
            </div>
            }
        </div>
    )
}

export default ShoppingCart