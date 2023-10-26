import { ReviewType } from "../../utils/types";
import StarRating from "./star-rating";
import ReviewHistogram from "./review-histogram";
import { sortReviewsInDiffArray} from "../../utils/sort-reviews";
import ReviewBody from "./review-body";
import { forwardRef, useRef} from "react";




interface ReviewSectionType {
    reviews:ReviewType[] | undefined,
    overallRating:number,
}





const ReviewsSection = forwardRef<HTMLDivElement, ReviewSectionType>(({reviews,overallRating},ref) => {
    
    const reviewRef = useRef<HTMLDivElement>(null)
    const filterReviewArray = sortReviewsInDiffArray(reviews)

    const scrollToReviews = () => {
        if (reviewRef.current) {
            reviewRef.current.scrollIntoView({
                behavior: 'smooth',
                block:'nearest',
                inline: 'center'
            })
        }
    }

    return(
        <div ref={ref} className="reviews-section">
            <h2 className="">Reviews</h2>
            <div  className="reviews-header">
                <ReviewHistogram arr={filterReviewArray} allReviewsLength={reviews && reviews.length} />
                <div className="overall-rating-header">
                    <div className="overall-rating-header-right">
                        <p>{overallRating.toFixed(1)}</p>
                        <StarRating rating={overallRating} size={"20"} type={"header"}/>
                    </div>
                    <p>{reviews && reviews.length} Reviews</p>
                </div>
            </div>
            <ReviewBody 
                myRef={reviewRef}
                scrollToTop={scrollToReviews}
                reviews={reviews}
                filterReviewArray={filterReviewArray}/>
        </div>
    )
})

export default ReviewsSection
