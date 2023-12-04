import { Link,useResolvedPath } from "react-router-dom";
import { ProductDb,} from "../../../utils/types";
import StarRating from "../../reviews-components/star-rating";
import { useImmer } from "use-immer";
import { deleteReview } from "../../../services/review";
import { AnimatePresence } from "framer-motion";
import DeleteReviewModal from "./review-delete-modal";




const UserSingularReview = ({review,token}:{
    review:{
        product:ProductDb,
        reviewDesc:string,
        reviewTitle:string
        rating:number,
        
    },
    token:string | null

}) => {


    const base = useResolvedPath('/').pathname
    const [readMore,setReadMore] = useImmer(false)
    const [modal,setModal] = useImmer(false)
    const [successMessage,setSuccessMessage] = useImmer(false)
    const reviewLength = review.reviewDesc.length <= 200


    const deleteOneReview = async() => {
        if(token){
            try{
                await deleteReview(review.product._id,token)
                setSuccessMessage(true)
            }catch(err){
                console.log(err)
            }finally{
                setTimeout(() => {
                    setModal(false)
                    location.reload()
                },1000)
            } 
        } 
    }

    return(
        <div className="user-review-container">
            <AnimatePresence>
                {
                    modal ? 
                    <DeleteReviewModal successMessage={successMessage} yesFnc={deleteOneReview} closeModal={() => setModal(false)} productName={review.product.name}/>
                    :
                    null
                }
                
            </AnimatePresence>
            <div className="review-main">
                <div className="left-container">
                    <Link to={`${base}shop-all/${review.product._id}`}>
                        <img src={review.product.images[0]}/>
                    </Link>
                
                </div>
                <div className="right-container">
                    <p>
                        <span>Product:</span>
                        {review.product.name}
                    </p>
                    {review.reviewTitle.length > 0 ?
                    <p>
                    <span>Review Title:</span>
                    {review.reviewTitle}
                    </p> :
                    null}
                    <div className="user-star-rating">
                        <span>Rating:</span>
                        <StarRating rating={review.rating} size="20" type="user-profile-review"></StarRating>
                    </div>
                    <p style={readMore ? {height:'100%'}:{height:'40px',overflow:'hidden'}}>
                        <span>Review Description:</span>
                        {review.reviewDesc}<span></span>
                    </p>
                    <button style={(readMore || reviewLength) ? {display:'none'}:{display:'flex'}} onClick={() => setReadMore(true)}>Read More</button>
                </div>
            </div>
            <div className="review-btn-container">
                <button onClick={() => setModal(true)}>Delete Review</button>
            </div>
        </div>
    )

}

export default UserSingularReview