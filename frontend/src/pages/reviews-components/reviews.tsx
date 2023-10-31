import { ReviewType } from "../../utils/types";
import StarRating from "./star-rating";
import ReviewHistogram from "./review-histogram";
import { sortReviewsInDiffArray} from "../../utils/sort-reviews";
import ReviewBody from "./review-body";
import { forwardRef, useRef} from "react";
import StarRatingForm from "./star-rating-form";
import { useImmer } from "use-immer";




interface ReviewSectionType {
    reviews:ReviewType[] | undefined,
    overallRating:number,
    loginFnc: () => void,
    openModal:() => void,
    rating:number | null,
    setStarRating:React.Dispatch<React.SetStateAction<null | number>>
}





const ReviewsSection = forwardRef<HTMLDivElement, ReviewSectionType>(({
    reviews,
    overallRating,
    loginFnc,
    openModal,
    rating,setStarRating},ref) => {

    
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
                <div className="review-header-left">
                    <ReviewHistogram arr={filterReviewArray} allReviewsLength={reviews && reviews.length} />
                    <div className="overall-rating-header">
                        <div className="overall-rating-header-right">
                            <p>{overallRating.toFixed(1)}</p>
                            <StarRating rating={overallRating} size={"20"} type={"header"}/>
                        </div>
                        <p>{reviews && reviews.length} Reviews</p>
                    
                    </div>
                </div>
                <div className="open-review-modal">
                    <p>Review This Product!</p>
                    <StarRatingForm 
                    size="50"
                    openModal={openModal}
                    rating={rating}
                    setRating={setStarRating}
                    showRating={false}
                    loginFnc={loginFnc}/>
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
