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
        <div className="histogram-container">
            <p className="histogram-title">Summary</p>
            {[...Array(5)].map((_bar,i) => {
                const starValue = 5 - i 
                const arrIndex = 4 - i
                const widthLength = arr && allReviewsLength ? ((arr[arrIndex].length)/allReviewsLength) * 100 : 0
                return(
                    <div key={i} className="singular-bar">
                        <StarRating rating={starValue} size={"15"} type={"histogram"}/>
                            <div className="bar">
                            <div className="rating-bar" style={{width:`${widthLength}%`}}></div>
                            </div>
                    </div>
                    
                )
            })}
            
        </div>
    )
}

export default ReviewHistogram