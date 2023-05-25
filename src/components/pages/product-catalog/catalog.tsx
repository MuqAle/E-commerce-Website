import Card from "./card";
import braceletData from "../../../assets/data/bracelet-data";
import { Link } from "react-router-dom";
import '../../../style/css/catalog.css'

interface Data {
    data: typeof braceletData,
    addFavorite: (id:string) => void,
    addToCart: (id:string) => void
}


const Catalog = ({data, addToCart,addFavorite}:Data) => {
    return (
        <div className="catalog">
            {data.map((d) => (
            <Link className="product-link" to={d.id} key={d.id}>
                <Card cardInfo={d} addFavorite={() => addFavorite(d.id)} addToCart={() => addToCart(d.id)} ></Card>
            </Link>
        ))}
        </div>
    )
}

export default Catalog