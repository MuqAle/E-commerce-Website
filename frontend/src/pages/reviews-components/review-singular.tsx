import { ReviewType } from "../../utils/types"
import StarRating from "./star-rating"



const ReviewSingular = (review:ReviewType) => {
    return (
        <div className="review">
            <div className="review-post-by-container">
                <p className="review-posted-by">{review.postedBy.firstName}</p>
            </div>
            <div className="review-details">
                <StarRating rating={review.rating} size={"10"} type={"review"} />
                <p className="review-title">{review.reviewTitle}</p>
                <p className="review-description">{review.reviewDesc}</p>
            </div>
            <div>
                <p>{`${review.datePosted}`}</p>
            </div>
        </div>
    )
}

export default ReviewSingular