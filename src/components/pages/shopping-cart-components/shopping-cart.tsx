import { Link } from "react-router-dom"
import ProductCart from "./product-cart"
import '../../../style/css/cart.css'


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
                        <h2>Your Bag</h2>
                        <Link to={'all-jewelry'}>Continue Shopping</Link>
                    </div>
                    <div className="shopping-cart-container">
                        {array.map((cart) => (
                            <ProductCart increaseAmount={increaseAmount} decreaseAmount={decreaseAmount} deleteProductCart={deleteProductCart} cart={cart} key={cart.product.id}></ProductCart>
                        ))}
                    </div>
                </div>
                <div className="shopping-cart-summery">
                    <h2>Order Summary</h2>
                    <div className="subtotal">
                        <p>Subtotal</p>
                        <p className="total-price">${array.reduce((a,b) => a + (b.product.salePrice * b.amount),0).toFixed(2)}</p>
                    </div>
                    <p>Shipping and taxes calculated at checkout</p>
                    <button className="checkout-btn">Secure Checkout</button>
                </div>
            </div>
            }
        </div>
    )
}

export default ShoppingCart