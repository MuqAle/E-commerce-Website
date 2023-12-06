import Card from "./product-catalog/card";
import shoppingBag from '../assets/imgs/svg-imgs/shopping-bag-white.svg'
import close from '../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'
import { Link } from "react-router-dom";
import '../style/css/wish-list.css'
import Breadcrumbs from "../components/breadcrumbs";
import { ProductDb } from "../utils/types";

interface WishlistProp{
    array:ProductDb[]
    addToCart: (id:string) => void
    deleteFavorite: (id:string) => void
}


const Wishlist = ({array,addToCart,deleteFavorite}:WishlistProp) => {
    return (
       <div className="wish-list-container">
            <Breadcrumbs name={null}/>
            <h1 className="title">Wishlist</h1>
           {array.length === 0 ?
                <div className="empty">
                    <p>Your Wishlist Is Empty</p>
                    <Link to={'/shop-all'}><button>Shop All Jewelry</button></Link>
                </div>
                    :
                <div className="wish-list-full">
                    {array.map((a) => (
                        <div className="wish-list-product" key={a._id}>
                            <button className='wishlist-close-btn' onClick={() => deleteFavorite(a._id)}><img src={close} alt="x button" /></button>
                            <Link className="wish-list-link" to={`/${a.type}/${a._id}`}>
                            <Card cardInfo={a}></Card>
                            </Link>
                            <button className="wishlist-cart-btn" onClick={() => addToCart(a._id)}><img src={shoppingBag} alt="shopping bag" /></button>
                        </div>
                        ))}
                </div>}
       </div>
    )
}

export default Wishlist