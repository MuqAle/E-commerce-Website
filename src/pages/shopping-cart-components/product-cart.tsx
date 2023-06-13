import { Link } from "react-router-dom"
import '../../style/css/cart-product.css'
import deleteBtn from '../../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'
import plus from '../../assets/imgs/svg-imgs/add_FILL0_wght100_GRAD0_opsz48.svg'
import subtract from '../../assets/imgs/svg-imgs/remove_FILL0_wght100_GRAD0_opsz48.svg'


interface ProductCart {
    cart:
    {product:{name:string,
        id:string,
        type:string,
        price:number,
        onSale:boolean,
        salePrice:number,
        description:string,
        Gallery:string[]}
        amount:number
      },
    increaseAmount:(id:string) => void,
    decreaseAmount:(id:string) => void,
    deleteProductCart : (id:string) => void
}


const ProductCart = ({cart, increaseAmount, decreaseAmount,deleteProductCart}:ProductCart) => {
    return (
        <div className="product-in-cart">
            <div className="product-cart-image">
                <Link to={`/${cart.product.type}/${cart.product.id}`}>
                    <img src={cart.product.Gallery[0]}/>
                </Link>
            </div>
            <div className="product-cart-info">
                
                <Link className="cart-product-name" to={`/${cart.product.type}/${cart.product.id}`}>
                    {cart.product.name}
                </Link>
                <div className="cart-amount">
                    <button className="cart-amount-btn" onClick={() => decreaseAmount(cart.product.id)}><img src={subtract}/></button>
                    <p>{cart.amount}</p>
                    <button className="cart-amount-btn" onClick={() => increaseAmount(cart.product.id)}><img src={plus}/></button>
                </div>
                {cart.product.onSale ?
                        <p className='price sale-price'>${cart.product.salePrice.toFixed(2)} <s>${cart.product.price}</s> </p>
                        :
                        <p className='price'>${cart.product.price}</p>
                    }
            </div>
            <button className="delete-product-cart" onClick={() => deleteProductCart(cart.product.id)}><img src={deleteBtn}/></button>
        </div>
    )
}

export default ProductCart