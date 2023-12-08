import '../../style/css/card.css'
import { CardType} from '../../utils/types'
import StarRating from '../reviews-components/star-rating'

const Card = ({cardInfo}:CardType) => {
    return(
        <div className='card'>
            <div className='card-img'>
                {cardInfo.onSale ? 
                <span className='on-sale'>On Sale</span>:null}
                <img className = 'jewelry-img' src={cardInfo.images[0]} alt="jewelry_img" loading='lazy'/>
            </div>
            <div className="label">
                <p className='card-name'>
                    {cardInfo.name}
                </p>
                    {cardInfo.onSale ?
                        <p className='price sale-price'>${cardInfo.salePrice?.toFixed(2)} <s>${cardInfo.price}</s> </p>
                        :
                        <p className='price'>${cardInfo.price}</p>
                    }
                    {cardInfo.overallRating === 0 ? 
                        null
                        :
                        <StarRating rating={cardInfo.overallRating} size={'17'} type='card'/>}
            </div>
            
        </div>
    )
}

export default Card