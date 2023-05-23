import Card from "./card";
import braceletData from "../../../assets/data/bracelet-data";
import { Link } from "react-router-dom";

interface Data {
    data: typeof braceletData,
    addFavorite: (id:string) => void,
    addToCart: (id:string) => void
}


const Catalog = ({data, addToCart,addFavorite}:Data) => {
    return (
        <div>
            {data.map((d) => (
            <Link to={d.id} key={d.id}>
                <Card cardInfo={d} addFavorite={() => addFavorite(d.id)} addToCart={() => addToCart(d.id)} ></Card>
            </Link>
        ))}
        </div>
    )
}

export default Catalog