import { useImmer } from "use-immer"
import { formatTimeDifference } from "../../utils/sort-reviews"
import { ReviewType } from "../../utils/types"
import StarRating from "./star-rating"



const ReviewSingular = ({review}:{review:ReviewType}) => {
    const date = formatTimeDifference(review.datePosted)
    const name = `${review.postedBy.firstName} ${review.postedBy.lastName[0]}.`
    const [readMore,setReadMore] = useImmer(false)
    const reviewLength = review.reviewDesc.length <= 200
    return (
        <div className="review"  >
            <div className="review-post-by-container">
                <StarRating rating={review.rating} size={"20"} type={"review-single"} />
                <p className="review-posted-by">{name}</p>
                <p className="review-posted-date">{`${date}`}</p>
            </div>
            <div className="review-details">
                <h3 className="review-title">{review.reviewTitle}</h3>
                <p className="review-description" style={readMore ? {height:'100%'}:{height:'40px',overflow:'hidden'}}>
                    {review.reviewDesc}
                </p>
                <button className="read-more-btn" style={(readMore || reviewLength) ? {display:'none'}:{display:'flex'}}  onClick={() => setReadMore(true)}>Read More</button>
            </div>
        </div>
    )
}

export default ReviewSingular