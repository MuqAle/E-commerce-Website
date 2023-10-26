import {FaStar} from 'react-icons/fa'
import { useImmer } from 'use-immer'

const StarRatingForm = () => {

    const [rating,setRating] = useImmer<null | number>(null)
    const [hover, setHover] = useImmer<null | number>(null)

    return(
        <div>
            {[...Array(5).map((_star,i) => {
                const ratingValue = i + 1
                return(
                    <label>
                        <input
                            type='radio'
                            name='star-rating-form'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            className = 'star-form'
                            color = {ratingValue <= (hover ?? rating ?? 0) ? "e7b9c0": "e4e5e9"}
                            onMouseEnter = {() => setHover(ratingValue)}
                            onMouseLeave = {() => setHover(null)}
                        />
                    </label>
                )
            })]}
            <p>The rating is {rating}</p>
        </div>
    )
}

export default StarRatingForm