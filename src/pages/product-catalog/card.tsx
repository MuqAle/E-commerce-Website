
import '../../style/css/card.css'

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
}

const Card = ({cardInfo}:CardProp) => {
    return(
        <div className='card'>
            <div className='card-img'>
                {cardInfo.onSale ? 
                <span className='on-sale'>On Sale</span>:null}
                <img className = 'jewelry-img' src={cardInfo.Gallery[0]} alt="jewelry_img" loading='lazy'/>
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