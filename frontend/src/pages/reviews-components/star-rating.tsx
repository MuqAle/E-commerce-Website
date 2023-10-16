import {FaStar} from 'react-icons/fa'

const StarRating = ({rating,size,type}:{rating:number,size:string,type:string}) => {

    const fullStars = Math.floor(rating);

    const starArray = [];


    for(let i = 1; i <= fullStars; i++)
    {
    starArray.push(1);
    }

    if(rating < 5) {

    const partialStar = rating - fullStars;

    starArray.push(partialStar);


    const emptyStars = 5 - starArray.length;

    for(let i=1; i<=emptyStars; i++) {
        starArray.push(0);
    }

    }

    return(
        <div className={`star-rating-container-${type}`}>
            {starArray.map((star,i) => {
                const uniqueGradientId = `star-rating-gradient-${i}`
                const firstOffSet = `${(star === 0 ? star - 1 : star) * 100}%`
                const secondOffSet = `${(star === 0 ? star : 1-star) * 100}%`
                return(
                    <div key={i} >
                        <svg width="0" height="0">
                        <linearGradient id={uniqueGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop stopColor="#e7b9c0" offset={firstOffSet} stopOpacity='1'/>
                        <stop stopColor="#a1a1a1" offset={secondOffSet} stopOpacity='1'/>
                        </linearGradient>
                        </svg>
                        <FaStar
                            size= {size}
                            className ='star-rating'
                            style={{fill: `url(#${uniqueGradientId})` }} 
                        />
                    </div>
                )
            })}
        </div>
    )
    
}

export default StarRating

