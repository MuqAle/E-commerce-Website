import { Link } from "react-router-dom"
import deleteBtn from '../../../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'

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
}


const ProductCart = ({cart}:ProductCart) => {
    return (
        <div>
            <div>
                <Link to={`${cart.product.type}/${cart.product.id}`}>
                    <img src={cart.product.Gallery[0]}/>
                </Link>
            </div>
            <div>
                <div className="cart-product-header">
                    <Link to={`${cart.product.type}/${cart.product.id}`}>
                        <p>{cart.product.name}</p>
                    </Link>
                    <button><img src={deleteBtn}/></button>
                </div>
                <div className="cart-amount">
                    <button>-</button>
                    <p>{cart.amount}</p>
                    <button>+</button>
                </div>
                {cart.product.onSale ?
                        <p className='price sale-price'>${cart.product.salePrice.toFixed(2)} <s>${cart.product.price}</s> </p>
                        :
                        <p className='price '>${cart.product.price}</p>
                    }
            </div>
        </div>
    )
}

export default ProductCart