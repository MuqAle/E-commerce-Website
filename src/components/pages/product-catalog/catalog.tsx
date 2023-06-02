import Card from "./card";
import braceletData from "../../../assets/data/bracelet-data";
import { NavLink } from "react-router-dom";
import '../../../style/css/catalog.css'
import heartOutline from '../../../assets/imgs/svg-imgs/heart-outline.svg'
import heartFilled from '../../../assets/imgs/svg-imgs/heart-filled.svg'
import shoppingBag from '../../../assets/imgs/svg-imgs/shopping-bag-white.svg'

interface Data {
    data: typeof braceletData,
    title: string
    addFavorite: (id:string) => void,
    addToCart: (id:string) => void
    favorited: (id:string) => boolean
}


const Catalog = ({data,title,addToCart,addFavorite, favorited}:Data) => {
    return (
        <div className="container">
            <h1 className="catalog-title">{title}</h1>
            <div className="catalog">
                {data.map((d) => (
                <div className="card-container" key={d.id}>
                    <NavLink className="product-link" to={d.id} >
                        <Card cardInfo={d}></Card>
                    </NavLink>
                <button className="left-btn" onClick={()=> addFavorite(d.id)}><img src={favorited(d.id) ? heartFilled:heartOutline} alt="add-favorite" /></button>
                <button className="right-btn" onClick={() => addToCart(d.id)}><img src={shoppingBag} alt='add-to-cart'></img></button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Catalog