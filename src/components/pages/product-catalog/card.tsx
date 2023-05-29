import heartCircle from '../../../assets/imgs/svg-imgs/heart-circle.svg'
import shoppingBag from '../../../assets/imgs/svg-imgs/shopping-bag-circle.svg'
import '../../../style/css/card.css'

interface CardProp{
    cardInfo:{
        name:string,
        id:string,
        type:string,
        price:number,
        onSale:boolean,
        salePrice:number,
        description:string,
        Gallery:string[],
    },
    addFavorite: () => void
    addToCart: () => void
        
}

const Card = ({cardInfo, addFavorite,addToCart}:CardProp) => {
    return(
        <div className='card'>
            <div className='card-img'>
                {cardInfo.onSale ? 
                <span className='on-sale'>On Sale</span>:null}
                <img className = 'jewelry-img' src={cardInfo.Gallery[0]} alt="jewelry_img" />
                <span className='btns'>
                    <button onClick={addFavorite}><img src={heartCircle} alt="add-favorite" /></button>
                    <button onClick={addToCart}><img src={shoppingBag} alt='add-to-cart'></img></button>
                </span>
            </div>
            <div className="label">
                <p className='card-name'>
                    {cardInfo.name}
                </p>
                    {cardInfo.onSale ?
                        <p className='price sale-price'>${cardInfo.salePrice.toFixed(2)} <s>${cardInfo.price}</s> </p>
                        :
                        <p className='price '>${cardInfo.price}</p>
                    }
            </div>
        </div>
    )
}

export default Card