
import StarRatingForm from "./star-rating-form"
import { postReview } from "../../services/review"
import { useImmer } from "use-immer"
import { motion } from "framer-motion"
import { LoginTypes, ProductDb, UserReviewType } from "../../utils/types"
import { useEffect } from "react"


interface ReviewFormTypes {
    loginFnc?:() => void
    setRating:React.Dispatch<React.SetStateAction<null | number>>
    rating:number|null,
    product:string,
    closeModal:() => void,
    user:LoginTypes | null,
    setReviews:React.Dispatch<React.SetStateAction<ProductDb['reviews']>>
    setFoundReview:React.Dispatch<React.SetStateAction<UserReviewType['reviews']>>,
    foundReview:{
        reviewTitle:string,
        reviewDesc:string,
        rating:number | null
    }|undefined
}

const backdrop = {
    visible:{opacity:1},
    hidden:{opacity:0},
    exit:{opacity:0}
  }


const ReviewForm = ({
    loginFnc,
    setRating,
    rating,
    user,
    product,
    closeModal,
    setReviews,
    foundReview,
    setFoundReview}:ReviewFormTypes) => {

    
    const [review, setReview] = useImmer(foundReview  ? foundReview:{
        reviewTitle:'',
        reviewDesc:'',
        rating:rating
    })
    const [reviewPosted,setReviewPosted] = useImmer(false)

    const [error,setError] = useImmer({
        reviewDesc:false,
        reviewTitle:false})
    
    const [disable,setDisable] = useImmer(false)


    useEffect(() => {
            setReview(review => {
                review.rating = rating
                return review
            })
    },[rating, setReview])


    const submitReview = async(e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
 
        if(error.reviewDesc){
            return 
        }else{
            if(user){
                try{
                    const token =  `Bearer ${user?.token}`
                    setDisable(true)
                    const response = await postReview(product,review,token)
                    setFoundReview(review)
                    setReviews(response.reviews)
                    setReviewPosted(true)
                    setTimeout(() => {
                        closeModal()
                        setDisable(false)
                        location.reload()
                    },700)
                    
                }catch(error){
                    console.log(error)
                }
            }
        }
        
    }

    const onChangeReviewTitle = (e:React.ChangeEvent<HTMLInputElement>) => {

        setReview(review =>{ 
            review.reviewTitle = e.target.value
            return review
        })
        setError(error => {
            if(e.target.value.length === 50){
                error.reviewTitle = true
            }else{
                error.reviewTitle = false
            }
            return error
        })
    }

    const onChangeReviewDesc = (e:React.ChangeEvent<HTMLTextAreaElement>) => {

        setReview(review =>{ 
            review.reviewDesc = e.target.value
            return review
        })
        setError(error => {
            if(e.target.value.length > 0 && e.target.value.length < 10){
                error.reviewDesc = true
            }else{
                error.reviewDesc = false
            }
            return error
        })
    }

    return(
        <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal" onClick={closeModal}>

        <div className="review-form-container" onClick={e => e.stopPropagation()}>
        <button className="close-modal review-form-close" disabled={disable} onClick={closeModal}>&times;</button>
           
                <form onSubmit={submitReview} >
                <section className="star-rating-section">
                    <StarRatingForm size="45" showRating={true} loginFnc={loginFnc} setRating={setRating} rating={rating}/>
                </section>
                
                <section className={`review-section`}>
                    <label htmlFor="review-title">Review Title</label>
                    <input maxLength = {50} value={review.reviewTitle} type="text" id="review-title"
                    onChange={onChangeReviewTitle}/>
                    <span> {review.reviewTitle.length} / 50 maximum </span>
                </section>
                <section className={`review-section ${error.reviewDesc ? ' error' : ''}`}>
                    <label htmlFor="review-text">Review<span>*</span></label>
                    <textarea id="review-text" value={review.reviewDesc}
                    onChange={onChangeReviewDesc}></textarea>
                    <span>
                        {error.reviewDesc ? 
                         `${review.reviewDesc.length}/10 characters too short`: 
                         review.reviewDesc.length > 0 ? `10/10 minimum` : `0/10 minimum` }
                    </span>
                </section>
                <button className="submit-review" disabled={disable} type="submit">Submit Review</button>
                {
                reviewPosted ? 
                <p style={{color:'green'}}>Your Review Has Been Posted!</p>
                :null
                }
            </form>
            
        </div>
        </motion.div>
    )
}

export default ReviewForm