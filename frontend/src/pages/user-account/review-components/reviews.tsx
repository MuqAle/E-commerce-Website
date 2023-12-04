import { UserTypes } from "../../../utils/types"
import UserSingularReview from "./singular-review"




const UserReviews = ({reviews,token}:{reviews:UserTypes['reviews'],token:string | null},) => {
   

    return(
        <div className="user-review-main">
            <h2 className="review-title">Reviews</h2>
            {
                reviews?.length === 0 ? 
                <p>No Reviews Have Been Posted</p> :
                reviews?.map((review) => (
                    <UserSingularReview key={review.product._id} review={review} token={token}/>
                ))
            }
        </div>
    )
}

export default UserReviews