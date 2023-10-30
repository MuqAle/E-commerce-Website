import { SetStateAction } from "react"
import StarRatingForm from "./star-rating-form"
import { postReview } from "../../services/review"
import { useImmer } from "use-immer"
import { motion } from "framer-motion"
import { LoginTypes, UserTypes } from "../../utils/types"

interface ReviewFormTypes {
    loginFnc?:() => void
    setRating:React.Dispatch<React.SetStateAction<null | number>>
    rating:number|null,
    product:string,
    closeModal:() => void,
    user:LoginTypes | null
}

interface ReviewCredentialsType{
    reviewTitle:string,
    reviewDesc:string,
    rating:number
}

const backdrop = {
    visible:{opacity:1},
    hidden:{opacity:0},
    exit:{opacity:0}
  }


const ReviewForm = ({loginFnc,setRating,rating,user,product,closeModal}:ReviewFormTypes) => {


    const [review, setReview] = useImmer({
        reviewTitle:'',
        reviewDesc:'',
        rating:rating
    })


    const submitReview = async(e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(user){
            await postReview(product,review,user.token)
        }
    }

    return(
        <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal" onClick={closeModal}>

        <div className="review-form-container" onClick={e => e.stopPropagation()}>
        <button className="close-modal review-form-close" onClick={closeModal}>&times;</button>
            <form onSubmit={submitReview} >
                <StarRatingForm size="45" showRating={true} loginFnc={loginFnc} setRating={setRating} rating={rating}/>
                <div>
                    <label htmlFor="review-title">Review Title</label>
                    <input type="text" value={review.reviewTitle} id="review-title"
                    onChange={e => setReview(review => review.reviewTitle = e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="review-text">Review</label>
                    <textarea id="review-text" cols={30} rows={4} value={review.reviewDesc}
                    onChange={e=> setReview(review => review.reviewDesc = e.target.value)}></textarea>
                </div>
                <button className="submit-review" type="submit">Submit Review</button>
            </form>
        </div>
        </motion.div>
    )
}

export default ReviewForm