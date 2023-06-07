import { Link } from "react-router-dom"
import ProductCart from "./product-cart"


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
}

const ShoppingCart = ({array}:Cart) => {
    return (
        <div>
            <div className="shopping-cart">
                <div className="shoppin-cart-header">
                    <h2>Your Bag</h2>
                    <Link to={'all-jewelry'}>Continue Shopping</Link>
                </div>
                <div className="shopping-cart-container">
                    {array.map((cart) => (
                        <ProductCart cart={cart} key={cart.product.id}></ProductCart>
                    ))}
                </div>
            </div>
            <div className="shopping-cart-summery">
                <h2>Order Summary</h2>
                <div className="subtotal">
                    <p>Subtotal</p>
                    <p className="total-price">{array.reduce((a,b) => a + (b.product.salePrice * b.amount),0)}</p>
                </div>
                <p>Shipping and taxes calculated at checkout</p>
                <button className="checkout-btn">Secure Checkout</button>
            </div>
        </div>
    )
}

