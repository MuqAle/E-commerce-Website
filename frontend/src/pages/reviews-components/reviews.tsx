import { ReviewType } from "../../utils/types";
import StarRating from "./star-rating";
import ReviewHistogram from "./review-histogram";
import { sortReviewsInDiffArray } from "../../utils/sort-reviews";

interface ReviewSectionType {
    reviews:ReviewType[] | undefined,
    overallRating:number
}


const ReviewsSection = ({reviews,overallRating}:ReviewSectionType) => {
    
    const sortedReviewArray = sortReviewsInDiffArray(reviews)

    return(
        <div className="reviews-section">
            <h2 className="">Reviews</h2>
            <div className="reviews-header">
                <div className="overall-rating-header">
                    <div className="overall-rating-header-right">
                        <p>{overallRating}</p>
                        <StarRating rating={overallRating} size={"15"} type={"header"}/>
                    </div>
                    <p>{reviews && reviews.length} Reviews</p>
                </div>
                <ReviewHistogram arr={sortedReviewArray} allReviewsLength={reviews && reviews.length} />
            </div>
        </div>
    )
}

export default ReviewsSection
