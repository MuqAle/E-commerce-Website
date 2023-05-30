import Card from "./card";
import braceletData from "../../../assets/data/bracelet-data";
import { Link } from "react-router-dom";
import '../../../style/css/catalog.css'
import heartCircle from '../../../assets/imgs/svg-imgs/heart-circle.svg'
import shoppingBag from '../../../assets/imgs/svg-imgs/shopping-bag-circle.svg'

interface Data {
    data: typeof braceletData,
    title: string
    addFavorite: (id:string) => void,
    addToCart: (id:string) => void
}


const Catalog = ({data,title,addToCart,addFavorite}:Data) => {
    return (
        <div className="container">
            <h1 className="catalog-title">{title}</h1>
            <div className="catalog">
                {data.map((d) => (
                <div className="card-container" key={d.id}>
                    <Link className="product-link" to={d.id} >
                        <Card cardInfo={d}></Card>
                    </Link>
                <button className="left-btn" onClick={()=> addFavorite(d.id)}><img src={heartCircle} alt="add-favorite" /></button>
                <button className="right-btn" onClick={() => addToCart(d.id)}><img src={shoppingBag} alt='add-to-cart'></img></button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Catalog