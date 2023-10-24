import { ReviewType } from "../../utils/types"
import ReviewSingular from "./review-singular";
import {v4 as uuidv4} from 'uuid'
import {
    sortHighestRating,
    sortLowestRating,
    sortOldestDate,
    sortRecentDate } from "../../utils/sort-reviews";
import { Updater, useImmer } from "use-immer";
import DropDownButton from "./dropdown";





interface ReviewBodyType{
    filterReviewArray: ReviewType[][] | undefined,
    setDisplayReviews: Updater<ReviewType[] | undefined>
    displayReviews:ReviewType[] | undefined
    reviews:ReviewType[] | undefined
}

interface ActiveType{
    type:string,
    name:string,
    reviewArray:ReviewType[] | undefined
    
}


const ReviewBody = ({filterReviewArray,setDisplayReviews,displayReviews,reviews}:ReviewBodyType) => {

    const [actives,setActives] = useImmer<ActiveType[]>([])
    const filterArrayName = ['5 Star','4 Star','3 Star','2 Star','1 Star']
    const sortArrayName = ['Highest Rating','Lowest Rating','Oldest','Newest']
    const sortArrayFunction = [sortHighestRating,sortLowestRating,sortOldestDate,sortRecentDate]

    const addFilter = (type:string,name:string,reviewArray:ReviewType[] | (ReviewType[] | undefined)) => {
        setActives(active => {
            const inActive = active.find(a => a.type === type)
            if(inActive){
                inActive.name = name,
                inActive.reviewArray = reviewArray
            }else{
                active.push(
                    {
                        type:type,
                        name:name,
                        reviewArray:reviewArray
                    }
                )
            }
            setDisplayReviews(active[active.length - 1].reviewArray)
        }
        )
    }

    const deleteFilter = (type:string) => {
        setActives((prevActives) => prevActives.filter((active) => active.type !== type))
        if(actives.length > 0){
            setDisplayReviews(actives[actives.length - 1].reviewArray)
        }else{
            setDisplayReviews(reviews)
        }
    }


    return(
        <div className="reviews-body">
                <div className="reviews-button">
                    <div className="filter-reviews">
                        <button className="dropdown-btn">Filter</button>
                        <div className="dropdown-content">
                            {filterReviewArray?.map((_arr,i) => {
                                const index = 4 - i
                                return(
                                    <DropDownButton key={i}
                                    title={filterArrayName[i]}
                                    applyActive = {() => addFilter('filter',filterArrayName[i],filterReviewArray[index]) }/>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sort-reviews">
                        <button className="dropdown-toggle-btn">Sort</button>
                            <div className="dropdown-content">
                                {sortArrayFunction.map((arr,i) => 
                                {
                                    return(
                                        <DropDownButton key={i}
                                        title={sortArrayName[i]}
                                        applyActive={() => addFilter('sort',sortArrayName[i],arr(displayReviews))}/>
                                    )
                                })}
                            </div>
                    </div>
                    <div className="active-applied">
                        {
                            actives.map(active => {
                                return(
                                    <div>
                                        <p>{active.name}</p>
                                        <button onClick={() => deleteFilter(active.type)}>&times;</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="reviews-list">
                    {
                        displayReviews?.map(review => {
                            return(
                                <ReviewSingular review={review} key={uuidv4()}/>
                            )
                        }) 
                    }
                </div>
            </div>
    )
}

export default ReviewBody