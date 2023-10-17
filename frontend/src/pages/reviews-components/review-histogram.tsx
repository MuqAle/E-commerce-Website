import StarRating from "./star-rating"


interface ReviewMatrixType{
    arr:{
        postedBy: {
            id: string;
            firstName: string;
            lastName: string;
        };
        reviewDesc: string;
        reviewTitle: string;
        rating: number;
        datePosted: Date;
    }[][] | undefined,
    allReviewsLength:number | undefined
}

const ReviewHistogram = ({arr,allReviewsLength}:ReviewMatrixType) => {
    return(
        <div className="histogram">
            {[...Array(5)].map((_bar,i) => {
                const starValue = i + 1
                const widthLength = arr && allReviewsLength ? ((arr[i].length)/allReviewsLength) * 100 : 0
                return(
                    <div key={i} className="singular-bar">
                        <StarRating rating={starValue} size={"10"} type={"histogram"}/>
                            <div className="bar">
                            <div className="rating bar" style={{width:`${widthLength}%`}}></div>
                            </div>
                    </div>
                    
                )
            })}
            
        </div>
    )
}

export default ReviewHistogram