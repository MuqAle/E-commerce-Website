import heartCircle from '../../assets/imgs/svg-imgs/heart-circle.svg'
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag-circle.svg'


interface CardProp{
    cardInfo:{
        name:string,
        id:string,
        type:string,
        price:number,
        onSale:boolean,
        salePrice:number,
        description:string,
        highResGallery:string[],
        lowResGallery:string[]
    },
    addFavorite: () => void
    addToCart: () => void
        
}

const Card = ({cardInfo, addFavorite,addToCart}:CardProp) => {
    return(
        <div className='card'>
            <div className='card-img'>
                <img src={cardInfo.highResGallery[0]} alt="jewelry_img" />
                    <div>
                        <button onClick={addFavorite}><img src={heartCircle} alt="add-favorite" /></button>
                        <button onClick={addToCart}><img src={shoppingBag} alt='add-to-cart'></img></button>
                    </div>
            </div>
            <p className='card-name'>
                {cardInfo.name}
            </p>
                {cardInfo.onSale ?  
                    <p className='price'><s>${cardInfo.price}</s> ${cardInfo.price}</p> 
                    : 
                    <p className='price'>${cardInfo.price}</p>
                }
        </div>
    )
}

export default Card