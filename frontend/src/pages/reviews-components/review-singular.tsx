import { formatTimeDifference } from "../../utils/sort-reviews"
import { ReviewType } from "../../utils/types"
import StarRating from "./star-rating"



const ReviewSingular = ({review}:{review:ReviewType}) => {
    const date = formatTimeDifference(review.datePosted)
    const name = `${review.postedBy.firstName} ${review.postedBy.lastName[0]}.`
    return (
        <div className="review"  >
            <div className="review-post-by-container">
                <StarRating rating={review.rating} size={"20"} type={"review-single"} />
                <p className="review-posted-by">{name}</p>
                <p className="review-posted-date">{`${date}`}</p>
            </div>
            <div className="review-details">
                
                <h3 className="review-title">{review.reviewTitle}</h3>
                <p className="review-description">{review.reviewDesc}</p>
            </div>
        </div>
    )
}

export default ReviewSingular