import { UserTypes } from "../../../utils/types"
import UserSingularReview from "./singular-review"
import Pagination from "../../../components/pagination"
import { useImmer } from "use-immer"
import { useMemo } from "react"




const UserReviews = ({reviews,token}:{reviews:UserTypes['reviews'],token:string | null},) => {

    const [currentPage, setCurrentPage] = useImmer(1)
    const PageSize = 6


    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return reviews?.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, reviews])

      const scrollOrderTitle = () => {
        window.scrollTo(0, 0)
    }
   

    return(
        <div className="user-review-main">
            <h2 className="review-title">Reviews</h2>
            {
                reviews?.length === 0 ? 
                <p>No Reviews Have Been Posted</p> :
                currentData?.map((review) => (
                    <UserSingularReview key={review.product._id} review={review} token={token}/>
                ))
            }
            <Pagination 
                slideToView={scrollOrderTitle}
                onPageChange={page => setCurrentPage(page)}
                totalCount={reviews ? reviews.length : 0 }
                currentPage={currentPage}
                pageSize={PageSize} siblingCount={1} />
        </div>
    )
}

export default UserReviews