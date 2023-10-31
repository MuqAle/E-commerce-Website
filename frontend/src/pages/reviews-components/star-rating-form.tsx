import {FaStar} from 'react-icons/fa'
import { useImmer } from 'use-immer'

const StarRatingForm = ({loginFnc,showRating,setRating,openModal,rating,size}:{
    loginFnc?: () => void,
    showRating:boolean
    setRating:React.Dispatch<React.SetStateAction<null | number>>
    openModal?:() => void,
    rating:null | number,
    size:string
    }) => {


    const [hover, setHover] = useImmer<null | number>(null)

    const ratingDescription = ['Poor','Fair','Average','Good','Excellent']


    return(
        <div>
            {[...Array(5)].map((_star,i) => {
                const ratingValue = i + 1
                return(
                    <label key={i}>
                        <input
                            type='radio'
                            name='star-rating-form'
                            value={ratingValue}
                            onClick={() => {
                                if(loginFnc){
                                    loginFnc()
                                }if(openModal){
                                    openModal()
                                }
                                setRating(rating => {
                                    rating = ratingValue
                                return rating})
                                
                            }
                            }
                        />
                        <FaStar
                            size = {size}
                            className = 'star-form'
                            color = {ratingValue <= (hover ?? rating ?? 0) ? "e7b9c0": "e4e5e9"}
                            onMouseEnter = {() => setHover(ratingValue)}
                            onMouseLeave = {() => setHover(null)}
                        />
                    </label>
                )
            })}
            {showRating && rating ? 
            <p className='rating-description'>
                {rating} out of 5 star selected. Product is {ratingDescription[rating-1]}
            </p> :
            null}
        </div>
    )
}

export default StarRatingForm